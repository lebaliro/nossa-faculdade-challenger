// src/app/page.tsx
import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';

// Buscar cursos populares do banco de dados
async function getCursosPopulares() {
  return await prisma.curso.findMany({
    take: 4,
    orderBy: { createdAt: 'desc' },
  });
}

export default async function Home() {
  const cursos = await getCursosPopulares();

  return (
    <div className="min-h-screen">
      {/* Banner Hero */}
      <section className="bg-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Transforme seu futuro com nossos cursos</h1>
          <p className="text-xl mb-8">Aprenda com os melhores instrutores do mercado</p>
          <Link 
            href="/cursos" 
            className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold py-3 px-6 rounded-lg transition"
          >
            Explorar Cursos
          </Link>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Por que escolher nossa plataforma?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Acesso Vitalício', icon: '⏳', desc: 'Estude no seu ritmo, sem pressão' },
              { title: 'Certificado Reconhecido', icon: '📜', desc: 'Valide seus conhecimentos' },
              { title: 'Suporte 24/7', icon: '💬', desc: 'Tire dúvidas a qualquer momento' },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
                <span className="text-4xl mb-4 inline-block">{item.icon}</span>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cursos Populares */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Cursos em Destaque</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cursos.map((curso) => (
              <div key={curso.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                <div className="relative h-48">
                  <Image 
                    src={curso.imagemUrl || '/placeholder-curso.jpg'} 
                    alt={curso.nome} 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{curso.nome}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{curso.descricao}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-blue-700">R$ {curso.preco.toFixed(2)}</span>
                    <Link 
                      href={`/cursos/${curso.id}`} 
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Ver detalhes →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">O que nossos alunos dizem</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: 'Ana Silva', text: 'Os cursos mudaram minha carreira!', role: 'Aluna de Design' },
              { name: 'Carlos Souza', text: 'Conteúdo prático e direto ao ponto.', role: 'Aluno de Programação' },
            ].map((depoimento, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-600 italic mb-4">"{depoimento.text}"</p>
                <div className="font-semibold">{depoimento.name}</div>
                <div className="text-sm text-gray-500">{depoimento.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}