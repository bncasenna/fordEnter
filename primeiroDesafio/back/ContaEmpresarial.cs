public class ContaEmpresarial : ContaBancaria
{
	public double LimiteEmprestimo { get; private set; }

	public ContaEmpresarial(int numeroConta, Cliente titular, double saldoInicial, double limiteEmprestimo)
		: base(numeroConta, titular, saldoInicial)
	{
		LimiteEmprestimo = limiteEmprestimo;
	}

	public override void Sacar(double valor)
	{
		if (valor > Saldo)
			throw new TransacaoException("Saldo insuficiente na Conta Empresarial!");

		Saldo -= valor;
	}

	public void RealizarEmprestimo(double valor)
	{
		if (valor > LimiteEmprestimo)
			throw new TransacaoException($"Valor acima do limite de empréstimo disponível (R$ {LimiteEmprestimo:F2}).");

		Saldo += valor;
		LimiteEmprestimo -= valor;
	}
}