public class ContaPoupanca : ContaBancaria
{
    public double TaxaRendimento { get; private set; } = 0.005; // 0.5% ao mês

    public ContaPoupanca(int numeroConta, Cliente titular, double saldoInicial)
        : base(numeroConta, titular, saldoInicial) { }

    public override void Sacar(double valor)
    {
        if (valor > Saldo)
            throw new TransacaoException("Saldo insuficiente para realizar o saque na Poupança!");

        Saldo -= valor;
    }

    public void CalcularRendimento()
    {
        Saldo += Saldo * TaxaRendimento;
    }
}