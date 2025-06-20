import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Iniciando seed do banco de dados...")

  const hashedPassword = await hash("admin123", 12)

  const admin = await prisma.user.upsert({
    where: { email: "admin@cursos.com" },
    update: {},
    create: {
      email: "admin@cursos.com",
      name: "Administrador",
      password: hashedPassword,
    },
  })

  console.log("👤 Usuário admin criado:", admin.email)

  const categories = [
    {
      name: "Tecnologia",
      slug: "tecnologia",
      description: "Cursos de programação, desenvolvimento e tecnologia",
    },
    {
      name: "Design",
      slug: "design",
      description: "Cursos de design gráfico, UX/UI e criatividade",
    },
    {
      name: "Marketing",
      slug: "marketing",
      description: "Cursos de marketing digital e estratégias de vendas",
    },
    {
      name: "Negócios",
      slug: "negocios",
      description: "Cursos de empreendedorismo e gestão empresarial",
    },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    })
  }

  console.log("📂 Categorias criadas")

  const techCategory = await prisma.category.findUnique({ where: { slug: "tecnologia" } })
  const designCategory = await prisma.category.findUnique({ where: { slug: "design" } })
  const marketingCategory = await prisma.category.findUnique({ where: { slug: "marketing" } })
  const businessCategory = await prisma.category.findUnique({ where: { slug: "negocios" } })

  const courses = [
    {
      title: "Desenvolvimento Web Completo",
      slug: "desenvolvimento-web-completo",
      description: "Aprenda HTML, CSS, JavaScript, React e Node.js do zero ao avançado",
      content: `
        ## O que você vai aprender:
        
        ### Módulo 1: Fundamentos
        - HTML5 semântico
        - CSS3 e Flexbox/Grid
        - JavaScript ES6+
        
        ### Módulo 2: Frontend
        - React.js
        - Next.js
        - TypeScript
        
        ### Módulo 3: Backend
        - Node.js
        - Express.js
        - Banco de dados
        
        ### Módulo 4: Deploy
        - Vercel
        - Netlify
        - AWS
      `,
      price: 297.0,
      image: "/placeholder.svg?height=400&width=600",
      categoryId: techCategory!.id,
    },
    {
      title: "Design UX/UI Profissional",
      slug: "design-ux-ui-profissional",
      description: "Domine as ferramentas e metodologias de UX/UI Design",
      content: `
        ## Conteúdo do curso:
        
        ### Fundamentos de UX
        - Pesquisa com usuários
        - Personas e jornadas
        - Arquitetura da informação
        
        ### Design de Interface
        - Figma avançado
        - Design System
        - Prototipagem
        
        ### Metodologias
        - Design Thinking
        - Lean UX
        - Testes de usabilidade
      `,
      price: 247.0,
      image: "/placeholder.svg?height=400&width=600",
      categoryId: designCategory!.id,
    },
    {
      title: "Marketing Digital Estratégico",
      slug: "marketing-digital-estrategico",
      description: "Estratégias completas de marketing digital para alavancar seu negócio",
      content: `
        ## Módulos do curso:
        
        ### Marketing de Conteúdo
        - Criação de conteúdo
        - SEO e otimização
        - Blog e redes sociais
        
        ### Tráfego Pago
        - Google Ads
        - Facebook Ads
        - Instagram Ads
        
        ### Analytics
        - Google Analytics
        - Métricas importantes
        - ROI e conversões
      `,
      price: 197.0,
      image: "/placeholder.svg?height=400&width=600",
      categoryId: marketingCategory!.id,
    },
    {
      title: "Empreendedorismo Digital",
      slug: "empreendedorismo-digital",
      description: "Como criar e escalar um negócio digital do zero",
      content: `
        ## Jornada do empreendedor:
        
        ### Validação de Ideia
        - Pesquisa de mercado
        - MVP (Produto Mínimo Viável)
        - Feedback de clientes
        
        ### Modelo de Negócio
        - Canvas de negócio
        - Precificação
        - Canais de venda
        
        ### Crescimento
        - Marketing digital
        - Vendas online
        - Escalabilidade
      `,
      price: 347.0,
      image: "/placeholder.svg?height=400&width=600",
      categoryId: businessCategory!.id,
    },
    {
      title: "Python para Iniciantes",
      slug: "python-para-iniciantes",
      description: "Aprenda Python do básico ao avançado com projetos práticos",
      content: `
        ## Conteúdo programático:
        
        ### Básico
        - Sintaxe e variáveis
        - Estruturas de controle
        - Funções e módulos
        
        ### Intermediário
        - Orientação a objetos
        - Manipulação de arquivos
        - APIs e requests
        
        ### Projetos
        - Sistema de cadastro
        - Web scraping
        - API REST
      `,
      price: 167.0,
      image: "/placeholder.svg?height=400&width=600",
      categoryId: techCategory!.id,
    },
    {
      title: "Photoshop Avançado",
      slug: "photoshop-avancado",
      description: "Técnicas avançadas de edição e manipulação de imagens",
      content: `
        ## Técnicas avançadas:
        
        ### Edição Profissional
        - Correção de cores
        - Retoque de pele
        - Composição de imagens
        
        ### Efeitos Especiais
        - Manipulação digital
        - Efeitos de luz
        - Texturas e patterns
        
        ### Workflow
        - Actions e automação
        - Organização de layers
        - Exportação otimizada
      `,
      price: 127.0,
      image: "/placeholder.svg?height=400&width=600",
      categoryId: designCategory!.id,
    },
    {
      title: "React.js Avançado",
      slug: "react-js-avancado",
      description: "Domine React Hooks, Context API, Redux e padrões avançados",
      content: `
        ## Conteúdo avançado:
        
        ### Hooks Avançados
        - Custom hooks
        - useReducer e useCallback
        - useMemo e useRef
        
        ### Gerenciamento de Estado
        - Context API
        - Redux Toolkit
        - Zustand
        
        ### Padrões e Performance
        - Code splitting
        - Lazy loading
        - Memoização
      `,
      price: 187.0,
      image: "/placeholder.svg?height=400&width=600",
      categoryId: techCategory!.id,
    },
    {
      title: "Node.js e APIs REST",
      slug: "node-js-apis-rest",
      description: "Desenvolva APIs robustas com Node.js, Express e MongoDB",
      content: `
        ## Desenvolvimento Backend:
        
        ### Fundamentos Node.js
        - Event loop
        - Módulos e NPM
        - Async/await
        
        ### Express.js
        - Middlewares
        - Rotas e controllers
        - Validação de dados
        
        ### Banco de Dados
        - MongoDB com Mongoose
        - Relacionamentos
        - Queries otimizadas
      `,
      price: 157.0,
      image: "/placeholder.svg?height=400&width=600",
      categoryId: techCategory!.id,
    },
    {
      title: "TypeScript Completo",
      slug: "typescript-completo",
      description: "Aprenda TypeScript do zero e melhore a qualidade do seu código",
      content: `
        ## TypeScript Profissional:
        
        ### Tipos Básicos
        - Primitivos
        - Arrays e objetos
        - Unions e intersections
        
        ### Tipos Avançados
        - Generics
        - Utility types
        - Conditional types
        
        ### Integração
        - React + TypeScript
        - Node.js + TypeScript
        - Configuração de projetos
      `,
      price: 137.0,
      image: "/placeholder.svg?height=400&width=600",
      categoryId: techCategory!.id,
    },
    {
      title: "DevOps e Deploy",
      slug: "devops-deploy",
      description: "Aprenda CI/CD, Docker, Kubernetes e deploy automatizado",
      content: `
        ## DevOps na Prática:
        
        ### Containers
        - Docker básico e avançado
        - Docker Compose
        - Otimização de imagens
        
        ### CI/CD
        - GitHub Actions
        - Jenkins
        - Deploy automatizado
        
        ### Cloud
        - AWS básico
        - Kubernetes
        - Monitoramento
      `,
      price: 227.0,
      image: "/placeholder.svg?height=400&width=600",
      categoryId: techCategory!.id,
    },
    {
      title: "Figma Masterclass",
      slug: "figma-masterclass",
      description: "Domine o Figma para criar interfaces profissionais e colaborativas",
      content: `
        ## Figma Profissional:
        
        ### Interface e Ferramentas
        - Workspace otimizado
        - Componentes e variantes
        - Auto layout e constraints
        
        ### Design System
        - Criação de bibliotecas
        - Tokens de design
        - Documentação
        
        ### Colaboração
        - Prototipagem avançada
        - Handoff para desenvolvedores
        - Versionamento
      `,
      price: 147.0,
      image: "/placeholder.svg?height=400&width=600",
      categoryId: designCategory!.id,
    },
    {
      title: "Ilustração Digital",
      slug: "ilustracao-digital",
      description: "Crie ilustrações profissionais com Procreate e Adobe Illustrator",
      content: `
        ## Ilustração Digital:
        
        ### Fundamentos
        - Teoria das cores
        - Composição
        - Anatomia básica
        
        ### Ferramentas
        - Procreate (iPad)
        - Adobe Illustrator
        - Photoshop para ilustração
        
        ### Estilos
        - Flat design
        - Isométrico
        - Caricaturas
      `,
      price: 167.0,
      image: "/placeholder.svg?height=400&width=600",
      categoryId: designCategory!.id,
    },
    {
      title: "Motion Design",
      slug: "motion-design",
      description: "Animações e motion graphics com After Effects e Lottie",
      content: `
        ## Motion Design:
        
        ### After Effects
        - Interface e ferramentas
        - Keyframes e easing
        - Expressões básicas
        
        ### Animações
        - Logo animations
        - UI/UX animations
        - Character animation
        
        ### Exportação
        - Lottie para web
        - Vídeo otimizado
        - GIF animado
      `,
      price: 197.0,
      image: "/placeholder.svg?height=400&width=600",
      categoryId: designCategory!.id,
    },
    {
      title: "Copywriting Avançado",
      slug: "copywriting-avancado",
      description: "Técnicas de persuasão e escrita que convertem em vendas",
      content: `
        ## Copywriting Profissional:
        
        ### Psicologia da Persuasão
        - Gatilhos mentais
        - Escassez e urgência
        - Prova social
        
        ### Estruturas
        - AIDA (Atenção, Interesse, Desejo, Ação)
        - PAS (Problema, Agitação, Solução)
        - Fórmula 4P
        
        ### Aplicações
        - Landing pages
        - Emails de vendas
        - Anúncios pagos
      `,
      price: 177.0,
      image: "/placeholder.svg?height=400&width=600",
      categoryId: marketingCategory!.id,
    },
    {
      title: "Instagram Marketing",
      slug: "instagram-marketing",
      description: "Estratégias completas para crescer e monetizar no Instagram",
      content: `
        ## Instagram Marketing:
        
        ### Crescimento Orgânico
        - Algoritmo do Instagram
        - Hashtags estratégicas
        - Engajamento real
        
        ### Conteúdo
        - Reels virais
        - Stories interativos
        - Carrosséis educativos
        
        ### Monetização
        - Instagram Shopping
        - Lives de vendas
        - Parcerias e influenciadores
      `,
      price: 137.0,
      image: "/placeholder.svg?height=400&width=600",
      categoryId: marketingCategory!.id,
    },
    {
      title: "Google Ads Completo",
      slug: "google-ads-completo",
      description: "Domine o Google Ads e otimize seus anúncios para máximo ROI",
      content: `
        ## Google Ads Profissional:
        
        ### Campanhas Search
        - Keywords research
        - Match types
        - Quality Score
        
        ### Campanhas Display
        - Segmentação avançada
        - Remarketing
        - Similar audiences
        
        ### Otimização
        - A/B testing
        - Bid strategies
        - Analytics e relatórios
      `,
      price: 217.0,
      image: "/placeholder.svg?height=400&width=600",
      categoryId: marketingCategory!.id,
    },
    {
      title: "Email Marketing",
      slug: "email-marketing",
      description: "Estratégias de email marketing que convertem e engajam",
      content: `
        ## Email Marketing:
        
        ### Lista de Emails
        - Captura de leads
        - Segmentação
        - Automação
        
        ### Campanhas
        - Welcome series
        - Nurturing
        - Promocionais
        
        ### Métricas
        - Taxa de abertura
        - CTR e conversões
        - ROI por campanha
      `,
      price: 127.0,
      image: "/placeholder.svg?height=400&width=600",
      categoryId: marketingCategory!.id,
    },
    {
      title: "Gestão Financeira",
      slug: "gestao-financeira",
      description: "Controle financeiro empresarial e planejamento estratégico",
      content: `
        ## Gestão Financeira:
        
        ### Controle Financeiro
        - Fluxo de caixa
        - DRE simplificado
        - Indicadores financeiros
        
        ### Planejamento
        - Orçamento empresarial
        - Projeções
        - Análise de viabilidade
        
        ### Investimentos
        - ROI e payback
        - Financiamento
        - Gestão de riscos
      `,
      price: 187.0,
      image: "/placeholder.svg?height=400&width=600",
      categoryId: businessCategory!.id,
    },
    {
      title: "Vendas Online",
      slug: "vendas-online",
      description: "Técnicas de vendas digitais e funil de conversão",
      content: `
        ## Vendas Online:
        
        ### Funil de Vendas
        - Atração de leads
        - Nutrição
        - Conversão
        
        ### Técnicas de Venda
        - Objeções comuns
        - Gatilhos de compra
        - Follow-up
        
        ### Ferramentas
        - CRM
        - Automação
        - Analytics
      `,
      price: 157.0,
      image: "/placeholder.svg?height=400&width=600",
      categoryId: businessCategory!.id,
    },
    {
      title: "Gestão de Equipes",
      slug: "gestao-equipes",
      description: "Liderança eficaz e gestão de pessoas em ambientes remotos",
      content: `
        ## Gestão de Equipes:
        
        ### Liderança
        - Estilos de liderança
        - Feedback eficaz
        - Delegação
        
        ### Comunicação
        - Reuniões produtivas
        - Ferramentas colaborativas
        - Resolução de conflitos
        
        ### Produtividade
        - Metodologias ágeis
        - OKRs
        - Cultura organizacional
      `,
      price: 197.0,
      image: "/placeholder.svg?height=400&width=600",
      categoryId: businessCategory!.id,
    },
    {
      title: "E-commerce Completo",
      slug: "ecommerce-completo",
      description: "Como criar e gerenciar uma loja virtual de sucesso",
      content: `
        ## E-commerce:
        
        ### Plataformas
        - Shopify
        - WooCommerce
        - Nuvemshop
        
        ### Operações
        - Gestão de estoque
        - Logística
        - Atendimento ao cliente
        
        ### Marketing
        - SEO para e-commerce
        - Remarketing
        - Conversão de vendas
      `,
      price: 167.0,
      image: "/placeholder.svg?height=400&width=600",
      categoryId: businessCategory!.id,
    },
  ]

  for (const course of courses) {
    await prisma.course.upsert({
      where: { slug: course.slug },
      update: {},
      create: course,
    })
  }

  console.log("📚 Cursos criados")

  console.log("✅ Seed concluído com sucesso!")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
