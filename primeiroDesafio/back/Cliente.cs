// Cliente.cs
public class Cliente : IAutenticavel
{
    public string Nome { get; set; }
    public string CPF { get; private set; }
    private string Senha { set; get; }

    public Cliente(string nome, string cpf, string senha)
    {
        Nome = nome;
        CPF = cpf;
        Senha = senha;
    }

    public bool Autenticar(string cpf, string senha)
    {
        return CPF == cpf && Senha == senha;
    }
}