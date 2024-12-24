import mongoose from "mongoose";

export interface User extends mongoose.Document {
  name: string;
  username: string;
  password: string;
}
const UserSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: [true, "Nombre es requerido"],
    maxlength: [60, "Nombre no puede ser mayor a 60 caracteres"],
  },
  username: {
    type: String,
    required: [true, "Usuario es requerido"],
    maxlength: [60, "Usuario no puede ser mayor a 60 caracteres"],
  },
  password:{
    type:String,
    required: [true, "Contraseña es requerida"],
  }
  
});

export default mongoose.models?.User || mongoose.model<User>("User", UserSchema);