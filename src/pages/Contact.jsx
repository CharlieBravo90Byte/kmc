import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle } from 'lucide-react';
import styles from './Contact.module.css';

const contactInfo = [
  { icon: <Mail size={22} />,         label: 'Email',     value: 'ca.bravoj29@gmail.com', href: 'mailto:ca.bravoj29@gmail.com' },
  { icon: <Phone size={22} />,        label: 'Teléfono',  value: '+56 9 4819 2023',       href: 'tel:+56948192023' },
  { icon: <MessageCircle size={22} />, label: 'WhatsApp', value: '+56 9 4819 2023',       href: 'https://wa.me/+56948192023' },
  { icon: <MapPin size={22} />,       label: 'Ubicación', value: 'Chile',                 href: null },
];

const services = ['Impresión 3D', 'Impresión Láser', 'Estampados en tazas', 'Estampados en poleras', 'Otro'];

export default function Contact() {
  const [form, setForm]   = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [sent, setSent]   = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate send → redirect to WhatsApp
    const msg = encodeURIComponent(
      `Hola! Me llamo ${form.name}.\n` +
      `Email: ${form.email}\n` +
      `Teléfono: ${form.phone || 'No especificado'}\n` +
      `Servicio: ${form.service || 'No especificado'}\n\n` +
      `Mensaje: ${form.message}`
    );
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      window.open(`https://wa.me/+56948192023?text=${msg}`, '_blank');
    }, 800);
  };

  return (
    <main className="page-wrapper">
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <span className="badge badge-green">Hablemos</span>
          <h1 className={styles.pageTitle}>Contáctanos</h1>
          <p className={styles.pageSubtitle}>Cuéntanos tu idea y te responderemos lo antes posible.</p>
        </div>
      </div>

      <div className="container section-padding-sm">
        <div className={styles.layout}>

          {/* Contact cards */}
          <div className={styles.sidebar}>
            {contactInfo.map(c => (
              <div key={c.label} className={styles.contactCard}>
                <div className={styles.contactIcon}>{c.icon}</div>
                <div>
                  <p className={styles.contactLabel}>{c.label}</p>
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className={styles.contactValue}>
                      {c.value}
                    </a>
                  ) : (
                    <p className={styles.contactValue}>{c.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className={styles.sideNote}>
              <h4>Horario de atención</h4>
              <p>Lunes a Viernes: 9:00 – 18:00</p>
              <p>Sábados: 10:00 – 14:00</p>
              <p className={styles.waNota}>Respondemos WhatsApp fuera de horario 😊</p>
            </div>
          </div>

          {/* Form */}
          <div className={styles.formWrapper}>
            {sent ? (
              <div className={styles.successMsg}>
                <CheckCircle size={56} color="var(--green)" />
                <h3>¡Mensaje enviado!</h3>
                <p>Te redirigimos a WhatsApp para que podamos hablar directamente. ¡Nos vemos pronto! 🚀</p>
                <button className="btn btn-outline" onClick={() => setSent(false)}>Enviar otro mensaje</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.formTitle}>Envíanos un mensaje</h2>

                <div className={styles.formRow}>
                  <label className={styles.label}>
                    Nombre *
                    <input name="name" required placeholder="Tu nombre" value={form.name} onChange={handleChange} />
                  </label>
                  <label className={styles.label}>
                    Email *
                    <input name="email" type="email" required placeholder="tu@email.com" value={form.email} onChange={handleChange} />
                  </label>
                </div>

                <div className={styles.formRow}>
                  <label className={styles.label}>
                    Teléfono
                    <input name="phone" placeholder="+56 9 XXXX XXXX" value={form.phone} onChange={handleChange} />
                  </label>
                  <label className={styles.label}>
                    Servicio de interés
                    <select name="service" value={form.service} onChange={handleChange}>
                      <option value="">Selecciona un servicio</option>
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </label>
                </div>

                <label className={styles.label}>
                  Mensaje *
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Cuéntanos sobre tu proyecto, cantidad, material deseado..."
                    value={form.message}
                    onChange={handleChange}
                    style={{ resize: 'vertical', minHeight: '120px' }}
                  />
                </label>

                <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={loading}>
                  {loading ? <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> : <Send size={16} />}
                  {loading ? 'Enviando...' : 'Enviar por WhatsApp'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
