import mongoose from 'mongoose';

const metodiPagamentoSchema = mongoose.Schema({
    emailCliente: String,
    numeroCarta: Number,
    intestatario: String,
    dataScadenza: Date,
    CVV: Number,
});

const metodiPagamento = mongoose.model('metodiPagamento', metodiPagamentoSchema);

export default metodiPagamento;