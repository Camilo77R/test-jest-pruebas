const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    codigo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    precio: {
      type: Number,
      required: true,
      min: 0,
    },
    categoria: {
      type: String,
      required: true,
      enum: ['Tecnologia', 'Hogar', 'Oficina', 'Ropa', 'Calzado', 'Electrodomestico'],
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model('Producto', productSchema);
