
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price)
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export const mockTestimonials = [
  {
    id: 1,
    name: "Maria Silva",
    content: "Os cursos são excelentes! Consegui uma promoção no trabalho depois de aplicar o que aprendi.",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "João Santos",
    content: "Metodologia incrível e professores muito didáticos. Recomendo para todos!",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Ana Costa",
    content: "Mudou minha carreira completamente. Hoje trabalho como freelancer e ganho muito mais.",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Pedro Oliveira",
    content: "Conteúdo atualizado e muito prático. Consegui aplicar tudo no meu negócio.",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
]