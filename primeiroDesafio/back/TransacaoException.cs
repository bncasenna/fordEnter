using System;

public class TransacaoException : Exception
{
    public TransacaoException(string mensagem) : base(mensagem) { }
}