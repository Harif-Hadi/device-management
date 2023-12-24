import { useContext } from "react";
import Notification from "../components/notification";
import "../styles/globals.css";
import NotificationContext, {
  NotificationContextProvider,
} from "../store/notification-context";
import Layout from "../components/layout";

export default function App({ Component, pageProps }) {
  const notificationCtx = useContext(NotificationContext);

  return (
    <NotificationContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}
