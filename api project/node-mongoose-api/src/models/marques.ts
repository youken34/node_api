import { Schema, model } from 'mongoose';

interface IMarque {
    nom: string;
    logo: string;
    description: string;
}

const marqueSchema = new Schema<IMarque>({
    nom: { type: String, required: true },
    logo: { type: String, required: true },
    description: { type: String, required: true }
});

const Marque = model<IMarque>('Marque', marqueSchema);

export { Marque, IMarque, marqueSchema };
