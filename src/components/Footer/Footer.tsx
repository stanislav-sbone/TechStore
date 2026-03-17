import { ROUTES } from '@/routes/constants/routes';
import { Link } from 'react-router';
import styles from './Footer.module.css';
import { footerSections } from '@/constants/footer';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <Link to={ROUTES.HOME} className={styles.logo}>
          TechStore
        </Link>
        <div className={styles.content}>
          {footerSections.map((section) => (
            <div key={section.id} className={styles.footerLinks}>
              {section.links.map((link) => (
                <Link key={link.to} to={link.to} className={styles.link}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}

          <div className={styles.payment}>
            <a href="">
              <img
                src="/common/sbp.svg"
                alt="СБП"
                className={styles.payImage}
              />
            </a>
          </div>
        </div>
        <p className={styles.footerSign}>
          © Stanislav Borisenko | {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Footer;
