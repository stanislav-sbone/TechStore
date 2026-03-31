import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { HomeLink } from '@/components/HomeLink';
import styles from './SuccessOrder.module.css';

const SuccessOrder = () => {
  useDocumentTitle('Заказ оформлен');
  return (
    <section className={styles.success}>
      <img
        src="/common/successOrder.png"
        alt="notFound"
        className={styles.image}
      />
      <p className={styles.message}>Заказ оформлен</p>
      <p className={styles.submessage}>
        В ближайшее время с Вами свяжется менеджер магазина для уточнения
        деталей заказа
      </p>
      <HomeLink />
    </section>
  );
};

export default SuccessOrder;
