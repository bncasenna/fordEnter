using System;

public abstract class ContaBancaria
{
    public int NumeroConta { get; private set; }
    public Cliente Titular { get; private set; }
    public double Saldo { get; protected set; }

    public ContaBancaria(int numeroConta, Cliente titular, double saldoInicial)
    {
        NumeroConta = numeroConta;
        Titular = titular;
        Saldo = saldoInicial;
    }

    public void Depositar(double valor)
    {
        if (valor <= 0)
            throw new TransacaoException("O valor do depósito deve ser maior que zero!");

        Saldo += valor;
    }

    public abstract void Sacar(double valor);
}