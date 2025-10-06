#!/usr/bin/env python3
"""
COMPREHENSIVE ERROR HANDLING AND LOGGING SYSTEM
Production-ready error handling, logging, and monitoring for Nepal Platform
"""

import logging
import traceback
import sqlite3
import json
import os
import time
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, asdict
from functools import wraps
import requests
from pathlib import Path

@dataclass
class ErrorEvent:
    """Error event structure for tracking and analysis"""
    timestamp: str
    error_type: str
    error_message: str
    component: str
    severity: str  # 'critical', 'high', 'medium', 'low'
    context: Dict[str, Any]
    stack_trace: str
    resolved: bool = False

@dataclass
class SystemHealthMetrics:
    """System health metrics structure"""
    timestamp: str
    component: str
    status: str  # 'healthy', 'warning', 'critical'
    response_time: float
    memory_usage: Optional[float]
    error_count_24h: int
    last_successful_operation: str

class EnhancedErrorHandler:
    """Comprehensive error handling and logging system"""

    def __init__(self, base_dir: str = ".", enable_db_logging: bool = True):
        self.base_dir = Path(base_dir)
        self.logs_dir = self.base_dir / "logs"
        self.logs_dir.mkdir(exist_ok=True)

        self.enable_db_logging = enable_db_logging
        self.setup_logging()
        self.setup_error_database()

        # Error counters for rate limiting alerts
        self.error_counts = {}
        self.last_alert_time = {}

    def setup_logging(self):
        """Setup comprehensive logging configuration"""

        # Create formatters
        detailed_formatter = logging.Formatter(
            '%(asctime)s | %(levelname)-8s | %(name)-20s | %(funcName)-15s:%(lineno)-4d | %(message)s'
        )

        simple_formatter = logging.Formatter(
            '%(asctime)s | %(levelname)-8s | %(message)s'
        )

        # Setup main logger
        self.logger = logging.getLogger('nepal_platform')
        self.logger.setLevel(logging.DEBUG)

        # Clear existing handlers
        self.logger.handlers.clear()

        # File handlers for different log levels
        handlers = [
            {
                'name': 'error',
                'level': logging.ERROR,
                'file': self.logs_dir / 'errors.log',
                'formatter': detailed_formatter
            },
            {
                'name': 'warning',
                'level': logging.WARNING,
                'file': self.logs_dir / 'warnings.log',
                'formatter': detailed_formatter
            },
            {
                'name': 'info',
                'level': logging.INFO,
                'file': self.logs_dir / 'info.log',
                'formatter': simple_formatter
            },
            {
                'name': 'debug',
                'level': logging.DEBUG,
                'file': self.logs_dir / 'debug.log',
                'formatter': detailed_formatter
            }
        ]

        for handler_config in handlers:
            handler = logging.FileHandler(handler_config['file'])
            handler.setLevel(handler_config['level'])
            handler.setFormatter(handler_config['formatter'])
            self.logger.addHandler(handler)

        # Console handler
        console_handler = logging.StreamHandler()
        console_handler.setLevel(logging.INFO)
        console_handler.setFormatter(simple_formatter)
        self.logger.addHandler(console_handler)

        # Component-specific loggers
        self.collection_logger = logging.getLogger('nepal_platform.collection')
        self.dashboard_logger = logging.getLogger('nepal_platform.dashboard')
        self.database_logger = logging.getLogger('nepal_platform.database')
        self.analytics_logger = logging.getLogger('nepal_platform.analytics')

    def setup_error_database(self):
        """Setup database for error tracking and system health monitoring"""
        if not self.enable_db_logging:
            return

        try:
            self.error_db_path = self.logs_dir / 'system_monitoring.db'

            with sqlite3.connect(str(self.error_db_path)) as conn:
                # Error events table
                conn.execute("""
                    CREATE TABLE IF NOT EXISTS error_events (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        timestamp TEXT NOT NULL,
                        error_type TEXT NOT NULL,
                        error_message TEXT NOT NULL,
                        component TEXT NOT NULL,
                        severity TEXT NOT NULL,
                        context TEXT,  -- JSON
                        stack_trace TEXT,
                        resolved BOOLEAN DEFAULT FALSE,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                """)

                # System health metrics table
                conn.execute("""
                    CREATE TABLE IF NOT EXISTS health_metrics (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        timestamp TEXT NOT NULL,
                        component TEXT NOT NULL,
                        status TEXT NOT NULL,
                        response_time REAL,
                        memory_usage REAL,
                        error_count_24h INTEGER,
                        last_successful_operation TEXT,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                """)

                # Performance metrics table
                conn.execute("""
                    CREATE TABLE IF NOT EXISTS performance_metrics (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        timestamp TEXT NOT NULL,
                        operation TEXT NOT NULL,
                        duration_seconds REAL NOT NULL,
                        success BOOLEAN NOT NULL,
                        component TEXT NOT NULL,
                        metadata TEXT,  -- JSON
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                """)

        except Exception as e:
            print(f"Failed to setup error database: {e}")

    def log_error(self, error: Exception, component: str, context: Dict[str, Any] = None,
                  severity: str = 'medium'):
        """Log error with full context and stack trace"""

        error_event = ErrorEvent(
            timestamp=datetime.now().isoformat(),
            error_type=type(error).__name__,
            error_message=str(error),
            component=component,
            severity=severity,
            context=context or {},
            stack_trace=traceback.format_exc()
        )

        # Log to files
        log_level = {
            'critical': logging.CRITICAL,
            'high': logging.ERROR,
            'medium': logging.WARNING,
            'low': logging.INFO
        }.get(severity, logging.WARNING)

        self.logger.log(
            log_level,
            f"[{component}] {error_event.error_type}: {error_event.error_message}"
        )

        if severity in ['critical', 'high']:
            self.logger.error(f"Stack trace:\n{error_event.stack_trace}")

        # Log to database
        if self.enable_db_logging:
            self._save_error_to_db(error_event)

        # Check for alert conditions
        self._check_alert_conditions(error_event)

        return error_event

    def _save_error_to_db(self, error_event: ErrorEvent):
        """Save error event to database"""
        try:
            with sqlite3.connect(str(self.error_db_path)) as conn:
                conn.execute("""
                    INSERT INTO error_events (
                        timestamp, error_type, error_message, component,
                        severity, context, stack_trace, resolved
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    error_event.timestamp,
                    error_event.error_type,
                    error_event.error_message,
                    error_event.component,
                    error_event.severity,
                    json.dumps(error_event.context),
                    error_event.stack_trace,
                    error_event.resolved
                ))
        except Exception as e:
            self.logger.error(f"Failed to save error to database: {e}")

    def _check_alert_conditions(self, error_event: ErrorEvent):
        """Check if alert conditions are met and trigger alerts"""

        # Rate limiting for alerts
        alert_key = f"{error_event.component}_{error_event.error_type}"
        now = time.time()

        if alert_key in self.last_alert_time:
            if now - self.last_alert_time[alert_key] < 300:  # 5 minute cooldown
                return

        # Critical errors always alert
        if error_event.severity == 'critical':
            self._trigger_alert(error_event, "Critical error detected")
            self.last_alert_time[alert_key] = now

        # Count-based alerts
        self.error_counts[alert_key] = self.error_counts.get(alert_key, 0) + 1

        if self.error_counts[alert_key] >= 5:  # 5 errors of same type
            self._trigger_alert(error_event, f"Repeated error: {self.error_counts[alert_key]} occurrences")
            self.last_alert_time[alert_key] = now
            self.error_counts[alert_key] = 0  # Reset counter

    def _trigger_alert(self, error_event: ErrorEvent, alert_message: str):
        """Trigger alert (can be extended for email/Slack notifications)"""
        alert_log = f"🚨 ALERT: {alert_message}\n"
        alert_log += f"Component: {error_event.component}\n"
        alert_log += f"Error: {error_event.error_type} - {error_event.error_message}\n"
        alert_log += f"Severity: {error_event.severity}\n"
        alert_log += f"Time: {error_event.timestamp}"

        self.logger.critical(alert_log)

        # Save alert to file
        alert_file = self.logs_dir / 'alerts.log'
        with open(alert_file, 'a', encoding='utf-8') as f:
            f.write(f"{datetime.now().isoformat()} | {alert_log}\n\n")

    def log_performance(self, operation: str, duration: float, success: bool,
                       component: str, metadata: Dict[str, Any] = None):
        """Log performance metrics"""

        if self.enable_db_logging:
            try:
                with sqlite3.connect(str(self.error_db_path)) as conn:
                    conn.execute("""
                        INSERT INTO performance_metrics (
                            timestamp, operation, duration_seconds, success,
                            component, metadata
                        ) VALUES (?, ?, ?, ?, ?, ?)
                    """, (
                        datetime.now().isoformat(),
                        operation,
                        duration,
                        success,
                        component,
                        json.dumps(metadata or {})
                    ))
            except Exception as e:
                self.logger.error(f"Failed to log performance metric: {e}")

        # Log slow operations
        if duration > 10.0:  # Slow operation threshold
            self.logger.warning(f"Slow operation: {operation} took {duration:.2f}s in {component}")

    def log_health_check(self, component: str, status: str, response_time: float = None,
                        error_count_24h: int = 0, last_successful_operation: str = None):
        """Log system health check results"""

        health_metric = SystemHealthMetrics(
            timestamp=datetime.now().isoformat(),
            component=component,
            status=status,
            response_time=response_time or 0.0,
            memory_usage=None,  # Can be extended
            error_count_24h=error_count_24h,
            last_successful_operation=last_successful_operation or 'unknown'
        )

        if self.enable_db_logging:
            try:
                with sqlite3.connect(str(self.error_db_path)) as conn:
                    conn.execute("""
                        INSERT INTO health_metrics (
                            timestamp, component, status, response_time,
                            memory_usage, error_count_24h, last_successful_operation
                        ) VALUES (?, ?, ?, ?, ?, ?, ?)
                    """, (
                        health_metric.timestamp,
                        health_metric.component,
                        health_metric.status,
                        health_metric.response_time,
                        health_metric.memory_usage,
                        health_metric.error_count_24h,
                        health_metric.last_successful_operation
                    ))
            except Exception as e:
                self.logger.error(f"Failed to log health metric: {e}")

        # Log health issues
        if status == 'critical':
            self.logger.error(f"Component {component} in CRITICAL state")
        elif status == 'warning':
            self.logger.warning(f"Component {component} in WARNING state")

    def get_error_summary(self, hours_back: int = 24) -> Dict[str, Any]:
        """Get error summary for the specified time period"""

        if not self.enable_db_logging:
            return {"error": "Database logging not enabled"}

        try:
            cutoff_time = (datetime.now() - timedelta(hours=hours_back)).isoformat()

            with sqlite3.connect(str(self.error_db_path)) as conn:
                # Error counts by component
                cursor = conn.execute("""
                    SELECT component, severity, COUNT(*) as count
                    FROM error_events
                    WHERE timestamp >= ?
                    GROUP BY component, severity
                    ORDER BY count DESC
                """, (cutoff_time,))

                error_counts = {}
                for component, severity, count in cursor.fetchall():
                    if component not in error_counts:
                        error_counts[component] = {}
                    error_counts[component][severity] = count

                # Recent critical errors
                cursor = conn.execute("""
                    SELECT timestamp, component, error_type, error_message
                    FROM error_events
                    WHERE severity = 'critical' AND timestamp >= ?
                    ORDER BY timestamp DESC
                    LIMIT 10
                """, (cutoff_time,))

                critical_errors = [
                    {
                        'timestamp': row[0],
                        'component': row[1],
                        'error_type': row[2],
                        'error_message': row[3]
                    }
                    for row in cursor.fetchall()
                ]

                # Performance issues
                cursor = conn.execute("""
                    SELECT operation, component, AVG(duration_seconds) as avg_duration,
                           COUNT(*) as count, SUM(CASE WHEN success = 0 THEN 1 ELSE 0 END) as failures
                    FROM performance_metrics
                    WHERE timestamp >= ?
                    GROUP BY operation, component
                    HAVING avg_duration > 5.0 OR failures > 0
                    ORDER BY avg_duration DESC
                """, (cutoff_time,))

                performance_issues = [
                    {
                        'operation': row[0],
                        'component': row[1],
                        'avg_duration': row[2],
                        'count': row[3],
                        'failures': row[4]
                    }
                    for row in cursor.fetchall()
                ]

                return {
                    'time_period_hours': hours_back,
                    'error_counts_by_component': error_counts,
                    'critical_errors': critical_errors,
                    'performance_issues': performance_issues,
                    'generated_at': datetime.now().isoformat()
                }

        except Exception as e:
            self.logger.error(f"Failed to generate error summary: {e}")
            return {"error": str(e)}

    def cleanup_old_logs(self, days_to_keep: int = 30):
        """Clean up old log entries to prevent database bloat"""

        if not self.enable_db_logging:
            return

        try:
            cutoff_time = (datetime.now() - timedelta(days=days_to_keep)).isoformat()

            with sqlite3.connect(str(self.error_db_path)) as conn:
                # Clean old error events
                cursor = conn.execute(
                    "DELETE FROM error_events WHERE timestamp < ?",
                    (cutoff_time,)
                )
                errors_deleted = cursor.rowcount

                # Clean old performance metrics
                cursor = conn.execute(
                    "DELETE FROM performance_metrics WHERE timestamp < ?",
                    (cutoff_time,)
                )
                metrics_deleted = cursor.rowcount

                # Clean old health metrics
                cursor = conn.execute(
                    "DELETE FROM health_metrics WHERE timestamp < ?",
                    (cutoff_time,)
                )
                health_deleted = cursor.rowcount

                self.logger.info(f"Cleaned up old logs: {errors_deleted} errors, "
                               f"{metrics_deleted} metrics, {health_deleted} health records")

        except Exception as e:
            self.logger.error(f"Failed to cleanup old logs: {e}")

def error_handler(component: str, severity: str = 'medium',
                 reraise: bool = True, default_return: Any = None):
    """Decorator for automatic error handling and logging"""

    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            start_time = time.time()
            success = True

            try:
                result = func(*args, **kwargs)
                duration = time.time() - start_time

                # Log successful operation
                if hasattr(args[0], 'error_handler') and isinstance(args[0].error_handler, EnhancedErrorHandler):
                    args[0].error_handler.log_performance(
                        operation=func.__name__,
                        duration=duration,
                        success=True,
                        component=component,
                        metadata={'args_count': len(args), 'kwargs_count': len(kwargs)}
                    )

                return result

            except Exception as e:
                success = False
                duration = time.time() - start_time

                # Log error
                if hasattr(args[0], 'error_handler') and isinstance(args[0].error_handler, EnhancedErrorHandler):
                    args[0].error_handler.log_error(
                        error=e,
                        component=component,
                        context={
                            'function': func.__name__,
                            'args_count': len(args),
                            'kwargs': list(kwargs.keys()),
                            'duration': duration
                        },
                        severity=severity
                    )

                    args[0].error_handler.log_performance(
                        operation=func.__name__,
                        duration=duration,
                        success=False,
                        component=component,
                        metadata={'error_type': type(e).__name__, 'error_message': str(e)}
                    )

                if reraise:
                    raise
                else:
                    return default_return

        return wrapper
    return decorator

# Global error handler instance
global_error_handler = EnhancedErrorHandler()

def setup_global_error_handling():
    """Setup global error handling for the entire application"""
    global global_error_handler

    # Capture unhandled exceptions
    def handle_exception(exc_type, exc_value, exc_traceback):
        if issubclass(exc_type, KeyboardInterrupt):
            sys.__excepthook__(exc_type, exc_value, exc_traceback)
            return

        global_error_handler.log_error(
            error=exc_value,
            component='global',
            context={
                'exc_type': exc_type.__name__,
                'traceback': ''.join(traceback.format_tb(exc_traceback))
            },
            severity='critical'
        )

    import sys
    sys.excepthook = handle_exception

    return global_error_handler

if __name__ == "__main__":
    # Test the error handling system
    print("🔧 Testing Enhanced Error Handling System...")

    error_handler = EnhancedErrorHandler()

    # Test error logging
    try:
        raise ValueError("Test error for demonstration")
    except Exception as e:
        error_handler.log_error(e, 'test_component', {'test_context': 'demo'}, 'medium')

    # Test performance logging
    error_handler.log_performance('test_operation', 2.5, True, 'test_component')

    # Test health check
    error_handler.log_health_check('test_component', 'healthy', 1.2, 0, 'test_operation')

    # Generate summary
    summary = error_handler.get_error_summary(1)
    print("📊 Error Summary:")
    print(json.dumps(summary, indent=2))

    print("✅ Error handling system tested successfully!")
    print(f"📁 Logs saved to: {error_handler.logs_dir}")
    print(f"🗃️ Database saved to: {error_handler.error_db_path}")