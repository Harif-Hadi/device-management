import { useState } from "react";
import classes from "./AddDevice.module.css";
import AddDeviceForm from "./AddDeviceForm";

const AddDevice = () => {
  const [showAddDeviceForm, setShowAddDeviceForm] = useState(false);

  return (
    <div className={classes.add_device_container}>
      {!showAddDeviceForm && (
        <button
          className={classes.add_btn}
          onClick={() => setShowAddDeviceForm(true)}
        >
          Add New Deivce
        </button>
      )}
      {showAddDeviceForm && (
        <AddDeviceForm hideDeviceForm={() => setShowAddDeviceForm(false)} />
      )}
    </div>
  );
};

export default AddDevice;
