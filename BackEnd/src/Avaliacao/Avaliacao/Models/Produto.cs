namespace Avaliacao.Models
{
    public class Produto
    {
        public int ProdutoId { get; set; }
        public string Nome { get; set; }
        public string ImgUrl { get; set; }
        public decimal Preco { get; set; }
        public string Descricao { get; set; }
    }
}
