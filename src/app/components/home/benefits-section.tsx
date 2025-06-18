export function BenefitsSection() {
    const benefits = [
      {
        icon: "🎯",
        title: "Foco no Mercado",
        description: "Cursos desenvolvidos com base nas demandas reais do mercado de trabalho atual.",
      },
      {
        icon: "👨‍🏫",
        title: "Professores Especialistas",
        description: "Aprenda com profissionais que atuam nas melhores empresas do mercado.",
      },
      {
        icon: "📱",
        title: "Acesso Vitalício",
        description: "Estude no seu ritmo, quando e onde quiser, com acesso para sempre ao conteúdo.",
      },
      {
        icon: "🏆",
        title: "Certificado Reconhecido",
        description: "Receba certificado de conclusão reconhecido pelo mercado.",
      },
      {
        icon: "💬",
        title: "Suporte Dedicado",
        description: "Tire suas dúvidas diretamente com os instrutores e nossa equipe de suporte.",
      },
      {
        icon: "🚀",
        title: "Projetos Práticos",
        description: "Desenvolva projetos reais que você pode incluir no seu portfólio profissional.",
      },
    ]
  
    return (
      <section id="beneficios" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Por que escolher nossos cursos?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos uma experiência de aprendizado completa e focada no seu sucesso profissional
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  