"use client";

import { useMemo, useState } from "react";

type PaymentStatus = "Crítico" | "Riesgo" | "Pendiente" | "Recuperado";

type Payment = {
  id: number;
  customer: string;
  initials: string;
  reason: string;
  amount: number;
  status: PaymentStatus;
  days: number;
};

const demoPayments: Payment[] = [
  {
    id: 1,
    customer: "Acme Corporation",
    initials: "AC",
    reason: "Tarjeta vencida",
    amount: 2490,
    status: "Crítico",
    days: 7,
  },
  {
    id: 2,
    customer: "Beta SaaS",
    initials: "BS",
    reason: "Fondos insuficientes",
    amount: 1890,
    status: "Riesgo",
    days: 4,
  },
  {
    id: 3,
    customer: "Delta Systems",
    initials: "DS",
    reason: "Pago rechazado",
    amount: 1290,
    status: "Riesgo",
    days: 3,
  },
  {
    id: 4,
    customer: "Nova Digital",
    initials: "ND",
    reason: "Error de procesamiento",
    amount: 890,
    status: "Pendiente",
    days: 2,
  },
  {
    id: 5,
    customer: "Orbit Labs",
    initials: "OL",
    reason: "Tarjeta vencida",
    amount: 760,
    status: "Pendiente",
    days: 1,
  },
];

const chartData = [
  { day: "Lun", value: 38 },
  { day: "Mar", value: 52 },
  { day: "Mié", value: 46 },
  { day: "Jue", value: 68 },
  { day: "Vie", value: 61 },
  { day: "Sáb", value: 78 },
  { day: "Dom", value: 92 },
];

function Icon({
  name,
  size = 20,
}: {
  name: string;
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "grid":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );

    case "credit":
      return (
        <svg {...common}>
          <rect x="2.5" y="5" width="19" height="14" rx="2" />
          <path d="M2.5 10h19" />
          <path d="M6 15h4" />
        </svg>
      );

    case "users":
      return (
        <svg {...common}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );

    case "chart":
      return (
        <svg {...common}>
          <path d="M3 3v18h18" />
          <path d="m7 16 4-5 3 3 6-8" />
        </svg>
      );

    case "bolt":
      return (
        <svg {...common}>
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
        </svg>
      );

    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.42 1.42-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-2v-.48a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-1.42-1.42.06-.06A1.7 1.7 0 0 0 9.4 15a1.7 1.7 0 0 0-1.56-1.03H7v-2h.84A1.7 1.7 0 0 0 9.4 11a1.7 1.7 0 0 0-.34-1.88L9 9.06l1.42-1.42.06.06A1.7 1.7 0 0 0 12.36 8a1.7 1.7 0 0 0 1.03-1.56V6h2v.48A1.7 1.7 0 0 0 16.42 8a1.7 1.7 0 0 0 1.88-.34l.06-.06 1.42 1.42-.06.06A1.7 1.7 0 0 0 19.4 11a1.7 1.7 0 0 0 1.56 1.03H22v2h-.84A1.7 1.7 0 0 0 19.4 15Z" />
        </svg>
      );

    case "menu":
      return (
        <svg {...common}>
          <path d="M4 6h16" />
          <path d="M4 12h16" />
          <path d="M4 18h16" />
        </svg>
      );

    case "bell":
      return (
        <svg {...common}>
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
          <path d="M10 21h4" />
        </svg>
      );

    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );

    case "check":
      return (
        <svg {...common}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );

    case "alert":
      return (
        <svg {...common}>
          <path d="M10.3 3.8 2.1 18a2 2 0 0 0 1.7 3h16.4a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      );

    case "refresh":
      return (
        <svg {...common}>
          <path d="M20 11a8.1 8.1 0 0 0-15.5-3" />
          <path d="M4 4v4h4" />
          <path d="M4 13a8.1 8.1 0 0 0 15.5 3" />
          <path d="M20 20v-4h-4" />
        </svg>
      );

    default:
      return null;
  }
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function StatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <span className={`status status-${status.toLowerCase()}`}>
      <span className="status-dot" />
      {status}
    </span>
  );
}

export default function Dashboard() {
  const [demoMode, setDemoMode] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [toast, setToast] = useState("");

  const payments = demoMode ? demoPayments : [];

  const metrics = useMemo(() => {
    if (!demoMode) {
      return {
        risk: 0,
        recovered: 0,
        rate: 0,
        failed: 0,
      };
    }

    const risk = payments
      .filter((p) => p.status !== "Recuperado")
      .reduce((sum, p) => sum + p.amount, 0);

    return {
      risk,
      recovered: 8720,
      rate: 70,
      failed: 24,
    };
  }, [demoMode, payments]);

  function showToast(message: string) {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 3000);
  }

  function handleNav(label: string) {
    setActiveNav(label);
    setMobileMenu(false);

    if (label !== "Dashboard") {
      showToast(`${label}: módulo preparado para conectar.`);
    }
  }

  return (
    <div className="app-shell">
      {mobileMenu && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileMenu(false)}
        />
      )}

      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">C</div>

          <div>
            <div className="brand-name">ChurnGuard</div>
            <div className="brand-subtitle">Revenue Recovery</div>
          </div>
        </div>

        <nav className="navigation">
          <div className="nav-section-title">WORKSPACE</div>

          {[
            ["Dashboard", "grid"],
            ["Failed Payments", "credit"],
            ["Customers", "users"],
            ["Analytics", "chart"],
            ["Automations", "bolt"],
          ].map(([label, icon]) => (
            <button
              key={label}
              className={`nav-item ${
                activeNav === label ? "nav-active" : ""
              }`}
              onClick={() => handleNav(label)}
            >
              <Icon name={icon} size={19} />
              <span>{label}</span>

              {label === "Failed Payments" && demoMode && (
                <span className="nav-count">24</span>
              )}
            </button>
          ))}

          <div className="nav-section-title nav-bottom-title">
            ACCOUNT
          </div>

          <button
            className={`nav-item ${
              activeNav === "Settings" ? "nav-active" : ""
            }`}
            onClick={() => handleNav("Settings")}
          >
            <Icon name="settings" size={19} />
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="system-status">
            <span className="online-dot" />
            <div>
              <strong>System operational</strong>
              <span>All services running</span>
            </div>
          </div>

          <div className="profile">
            <div className="profile-avatar">MD</div>
            <div className="profile-info">
              <strong>Demo Account</strong>
              <span>admin@company.com</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenu(true)}
            aria-label="Abrir menú"
          >
            <Icon name="menu" />
          </button>

          <div className="breadcrumb">
            Workspace <span>/</span> <strong>{activeNav}</strong>
          </div>

          <div className="topbar-actions">
            <div className="demo-switch">
              <span>Demo Mode</span>

              <button
                className={`switch ${demoMode ? "switch-on" : ""}`}
                onClick={() => setDemoMode(!demoMode)}
                aria-label="Activar o desactivar modo demo"
              >
                <span />
              </button>
            </div>

            <button
              className="icon-button notification-button"
              onClick={() => showToast("No hay nuevas notificaciones.")}
              aria-label="Notificaciones"
            >
              <Icon name="bell" size={19} />
              {demoMode && <span className="notification-dot" />}
            </button>

            <div className="top-avatar">MD</div>
          </div>
        </header>

        <div className="content">
          <section className="hero">
            <div>
              <div className="eyebrow">
                <span className="live-dot" />
                LIVE REVENUE MONITOR
              </div>

              <h1>Revenue Recovery Command Center</h1>

              <p>
                Detectá pagos fallidos y recuperá ingresos antes de que se
                conviertan en churn.
              </p>
            </div>

            <button
              className="refresh-button"
              onClick={() => showToast("Datos actualizados.")}
            >
              <Icon name="refresh" size={17} />
              Actualizar
            </button>
          </section>

          {demoMode && (
            <div className="demo-banner">
              <div className="demo-banner-icon">
                <Icon name="bolt" size={18} />
              </div>

              <div>
                <strong>Modo demostración activo</strong>
                <span>
                  Los datos mostrados son simulados y no representan
                  transacciones reales.
                </span>
              </div>

              <button onClick={() => setDemoMode(false)}>
                Desactivar
              </button>
            </div>
          )}

          <section className="metrics-grid">
            <article className="metric-card">
              <div className="metric-top">
                <div className="metric-icon danger">
                  <Icon name="alert" size={19} />
                </div>

                <span className="metric-label">Ingresos en riesgo</span>
              </div>

              <div className="metric-value danger-text">
                {formatCurrency(metrics.risk)}
              </div>

              <div className="metric-footer">
                <span className="trend-down">+12.4%</span>
                <span>vs. mes anterior</span>
              </div>
            </article>

            <article className="metric-card">
              <div className="metric-top">
                <div className="metric-icon success">
                  <Icon name="check" size={19} />
                </div>

                <span className="metric-label">Recuperados este mes</span>
              </div>

              <div className="metric-value success-text">
                {formatCurrency(metrics.recovered)}
              </div>

              <div className="metric-footer">
                <span className="trend-up">+18.7%</span>
                <span>vs. mes anterior</span>
              </div>
            </article>

            <article className="metric-card">
              <div className="metric-top">
                <div className="metric-icon purple">
                  <Icon name="chart" size={19} />
                </div>

                <span className="metric-label">Tasa de recuperación</span>
              </div>

              <div className="metric-value">
                {metrics.rate.toFixed(1)}%
              </div>

              <div className="progress">
                <div
                  className="progress-fill"
                  style={{ width: `${metrics.rate}%` }}
                />
              </div>
            </article>

            <article className="metric-card">
              <div className="metric-top">
                <div className="metric-icon orange">
                  <Icon name="credit" size={19} />
                </div>

                <span className="metric-label">Pagos fallidos</span>
              </div>

              <div className="metric-value">{metrics.failed}</div>

              <div className="metric-footer">
                <span className="trend-neutral">8 nuevos</span>
                <span>últimas 24 horas</span>
              </div>
            </article>
          </section>

          <section className="main-grid">
            <article className="panel chart-panel">
              <div className="panel-header">
                <div>
                  <h2>Recovery Performance</h2>
                  <p>Ingresos recuperados durante los últimos 7 días.</p>
                </div>

                <select className="period-select" defaultValue="7">
                  <option value="7">Últimos 7 días</option>
                  <option value="30">Últimos 30 días</option>
                  <option value="90">Últimos 90 días</option>
                </select>
              </div>

              <div className="chart">
                <div className="chart-y">
                  <span>$1000</span>
                  <span>$750</span>
                  <span>$500</span>
                  <span>$250</span>
                  <span>$0</span>
                </div>

                <div className="chart-area">
                  <div className="grid-lines">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="bars">
                    {chartData.map((item) => (
                      <div className="bar-column" key={item.day}>
                        <div
                          className="bar"
                          style={{ height: `${item.value}%` }}
                          title={`${item.day}: $${item.value * 10}`}
                        />
                        <span>{item.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            <article className="panel automation-panel">
              <div className="panel-header">
                <div>
                  <h2>Automations</h2>
                  <p>Recovery engine status.</p>
                </div>

                <span className="active-badge">
                  <span />
                  Active
                </span>
              </div>

              <div className="automation-list">
                <div className="automation-item">
                  <div className="automation-icon">
                    <Icon name="alert" size={18} />
                  </div>

                  <div>
                    <strong>Payment Failure Detection</strong>
                    <span>Monitoring payment events</span>
                  </div>

                  <span className="check-small">✓</span>
                </div>

                <div className="automation-item">
                  <div className="automation-icon">
                    <Icon name="bolt" size={18} />
                  </div>

                  <div>
                    <strong>Smart Retry Engine</strong>
                    <span>Automatic retry sequences</span>
                  </div>

                  <span className="check-small">✓</span>
                </div>

                <div className="automation-item">
                  <div className="automation-icon">
                    <Icon name="users" size={18} />
                  </div>

                  <div>
                    <strong>Customer Recovery</strong>
                    <span>Recovery notifications</span>
                  </div>

                  <span className="check-small">✓</span>
                </div>
              </div>

              <button
                className="outline-button"
                onClick={() => handleNav("Automations")}
              >
                Administrar automatizaciones
                <Icon name="arrow" size={16} />
              </button>
            </article>
          </section>

          <section className="bottom-grid">
            <article className="panel payments-panel">
              <div className="panel-header">
                <div>
                  <h2>Payments Requiring Attention</h2>
                  <p>
                    Clientes con pagos fallidos que necesitan intervención.
                  </p>
                </div>

                <button
                  className="text-button"
                  onClick={() => handleNav("Failed Payments")}
                >
                  Ver todos
                  <Icon name="arrow" size={15} />
                </button>
              </div>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>CLIENTE</th>
                      <th>MOTIVO</th>
                      <th>MONTO</th>
                      <th>ANTIGÜEDAD</th>
                      <th>ESTADO</th>
                    </tr>
                  </thead>

                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id}>
                        <td>
                          <div className="customer-cell">
                            <div className="customer-avatar">
                              {payment.initials}
                            </div>

                            <strong>{payment.customer}</strong>
                          </div>
                        </td>

                        <td>{payment.reason}</td>

                        <td className="amount-cell">
                          {formatCurrency(payment.amount)}
                        </td>

                        <td>{payment.days} días</td>

                        <td>
                          <StatusBadge status={payment.status} />
                        </td>
                      </tr>
                    ))}

                    {!demoMode && (
                      <tr>
                        <td colSpan={5}>
                          <div className="empty-state">
                            <div className="empty-icon">
                              <Icon name="check" size={22} />
                            </div>

                            <strong>No hay pagos para mostrar</strong>

                            <span>
                              Conectá una fuente de pagos para comenzar a
                              monitorear eventos.
                            </span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </article>

            <article className="panel activity-panel">
              <div className="panel-header">
                <div>
                  <h2>Recent Activity</h2>
                  <p>Últimos eventos del sistema.</p>
                </div>
              </div>

              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-marker success-marker">
                    <Icon name="check" size={14} />
                  </div>

                  <div>
                    <strong>Pago recuperado</strong>
                    <span>Acme Corporation · $890</span>
                    <small>Hace 12 minutos</small>
                  </div>
                </div>

                <div className="activity-item">
                  <div className="activity-marker warning-marker">
                    <Icon name="alert" size={14} />
                  </div>

                  <div>
                    <strong>Pago rechazado</strong>
                    <span>Beta SaaS · $1.890</span>
                    <small>Hace 31 minutos</small>
                  </div>
                </div>

                <div className="activity-item">
                  <div className="activity-marker info-marker">
                    <Icon name="bolt" size={14} />
                  </div>

                  <div>
                    <strong>Retry ejecutado</strong>
                    <span>Delta Systems · intento #2</span>
                    <small>Hace 48 minutos</small>
                  </div>
                </div>

                <div className="activity-item">
                  <div className="activity-marker success-marker">
                    <Icon name="check" size={14} />
                  </div>

                  <div>
                    <strong>Pago recuperado</strong>
                    <span>Nova Digital · $540</span>
                    <small>Hace 1 hora</small>
                  </div>
                </div>
              </div>
            </article>
          </section>

          <footer className="footer">
            <span>ChurnGuard B2B · Revenue Recovery Intelligence</span>
            <span>v0.2.0 · Demo Environment</span>
          </footer>
        </div>
      </main>

      {toast && (
        <div className="toast">
          <div className="toast-icon">
            <Icon name="check" size={16} />
          </div>
          {toast}
        </div>
      )}
    </div>
  );
}
