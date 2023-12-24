import AddDevice from "../components/AddDevice";
import Head from "next/head";
import Devices from "../components/Devices";

const HomePage = () => {
  return (
    <div>
      <Head>
        <title>Device Management</title>
        <meta
          name="device management"
          content="Manage devices, with add, edit, and delete functionality"
        />
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "4rem",
        }}
      >
        <AddDevice />
        <Devices />
      </div>
    </div>
  );
};

export default HomePage;
