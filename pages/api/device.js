import { MongoClient, ObjectId } from "mongodb";

const handler = async (req, res) => {
  const client = await MongoClient.connect(process.env.MONGO_CONNECT_URL);

  const device = req.body;

  if (req.method === "PUT") {
    try {
      const db = client.db();
      await db.collection("device").insertOne(device);
      res.status(201).json({ message: "Successfully Sent Device Data" });
    } catch (error) {
      res.status(500).json({ message: "Failed to send data" });
    }
  }

  if (req.method === "GET") {
    try {
      const db = client.db();
      const documents = await db
        .collection("device")
        .find()
        .sort({ _id: -1 })
        .toArray();
      res.status(201).json({ devices: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting devices failed!!" });
    }
  }

  if (req.method === "DELETE") {
    const id = req.body;

    try {
      const db = client.db();
      await db
        .collection("device")
        .deleteOne({ _id: new ObjectId(String(id)) });
      res.status(201).json({ message: `Successfully deleted ${id}` });
    } catch (error) {
      res.status(500).json({ message: error.message || "Failed" });
    }
  }

  if (req.method === "PATCH") {
    const { id, device_name, owner, battery_status, device_type } = req.body;

    try {
      const db = client.db();

      await db
        .collection("device")
        .updateOne(
          { _id: new ObjectId(String(id)) },
          { $set: { device_name, owner, battery_status, device_type } }
        );

      res.status(201).json({ message: "Successfully updated" });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Failed to update device" });
    }
  }

  client.close();
};

export default handler;
