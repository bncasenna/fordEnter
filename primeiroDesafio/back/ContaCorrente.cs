public class ContaCorrente : ContaBancaria
{
    private const double TaxaSaque = 2.50;

    public ContaCorrente(int numeroConta, Cliente titular, double saldoInicial)
        : base(numeroConta, titular, saldoInicial) { }

    public override void Sacar(double valor)
    {
        double valorTotal = valor + TaxaSaque;
        if (valorTotal > Saldo)
            throw new TransacaoException($"Saldo insuficiente! (Taxa de saque: R$ {TaxaSaque:F2})");

        Saldo -= valorTotal;
    }
}