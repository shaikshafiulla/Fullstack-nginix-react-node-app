import { Schema, model, Document } from 'mongoose';

export interface IItem extends Document {
  title: string;
  description?: string;
}

const ItemSchema = new Schema<IItem>({
  title: { type: String, required: true },
  description: String
}, { timestamps: true });

export default model<IItem>('Item', ItemSchema);
    