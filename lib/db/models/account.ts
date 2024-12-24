import mongoose from "mongoose";

export interface account extends mongoose.Document {
  email: string;
  access_token: string;
  id: string;
}
const accountSchema = new mongoose.Schema<account>({
  email: {
    type: String,
    required: [true, "email es requerido"],
  },
  access_token: {
    type: String,
    required: [true, "id es requerido"],
  },
  id:{
    type:String,
    required: [true, "id es requerido"],
  },
  
});

export default mongoose.models.Account || mongoose.model<account>("Account", accountSchema);