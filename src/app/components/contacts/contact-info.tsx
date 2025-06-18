export function ContactInfo() {
    return (
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Fale Conosco</h2>
  
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="text-2xl mr-4">📧</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
              <p className="text-gray-600">comercial@nossafaculdade.com.br</p>
              <p className="text-gray-600">secretaria@nossafaculdade.com.br</p>
            </div>
          </div>
  
          <div className="flex items-start">
            <div className="text-2xl mr-4">📱</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Telefone</h3>
              <p className="text-gray-600">(88) 0800 1770 800</p>
              <p className="text-gray-600">(88) 99913-9972</p>
            </div>
          </div>
  
          <div className="flex items-start">
            <div className="text-2xl mr-4">📍</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Endereço</h3>
              <p className="text-gray-600">Av. Padre Cícero, 3000</p>
              <p className="text-gray-600">São José, Crato - CE, 63132-022</p>
            </div>
          </div>
  
          <div className="flex items-start">
            <div className="text-2xl mr-4">🕒</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Horário de Atendimento</h3>
              <p className="text-gray-600">Segunda a Sexta: 9h às 18h</p>
              <p className="text-gray-600">Sábado: 9h às 14h</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  