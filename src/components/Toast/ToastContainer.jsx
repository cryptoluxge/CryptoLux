import Toast from './Toast';
import { useToastStateContext } from '../../context/ToastContext';

export default function ToastContainer() {
  const { toasts } = useToastStateContext();
  return (
    <div className="absolute top-10 right-1 md:right-3 w-[350px] z-50">
      <div className="max-w-xl mx-auto">
        {toasts &&
          toasts.map((toast) => (
            <Toast
              id={toast.id}
              key={toast.id}
              type={toast.type}
              title={toast.title}
              message={toast.message}
            />
          ))}
      </div>
    </div>
  );
}