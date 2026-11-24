// Conteúdo do site, tirado do catálogo da Karina Fernandes (PDF). Campos marcados com "PREENCHER" não constam
// no catálogo e ficam ocultos na página enquanto estiverem vazios — nada é inventado.
export const WHATSAPP = '' // PREENCHER: DDI 55 + DDD + número, só dígitos (ex.: '5511999999999'). Vazio: o botão abre o WhatsApp para escolher o contato.
export const brand = {
  name: 'Karina Fernandes',
  role: 'Lash Designer',
}
export const contact = {
  instagram: '', // PREENCHER: usuário do Instagram, sem @
  address: '', // PREENCHER: endereço completo (mostra o mapa e o endereço no rodapé)
  mapsUrl: '', // PREENCHER: link do Google Maps (opcional)
  hours: 'Seg a Sex, 8h às 12h · Sáb, 8h às 20h',
}
export const schedule = [
  { days: 'Seg a Sex', time: '8:00 às 12:00' },
  { days: 'Sábado', time: '8:00 às 20:00' },
]
export const payments = [
  { icon: 'pix', label: 'Pix' },
  { icon: 'cash', label: 'Dinheiro' },
  { icon: 'card', label: 'Cartão', note: 'só por aproximação' },
]

// Link do WhatsApp com a mensagem pronta (usado como href real nos botões)
export const waUrl = (procedure?: string, kind: 'agendar' | 'duvida' = 'agendar') => {
  const msg = kind === 'duvida'
    ? 'Olá! Tenho uma dúvida sobre os procedimentos.'
    : procedure
      ? `Olá! Gostaria de agendar um horário para ${procedure}. Poderia me informar a disponibilidade?`
      : 'Olá! Gostaria de agendar um horário. Poderia me informar a disponibilidade?'
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`
}
export const openWhatsApp = (procedure?: string, kind?: 'agendar' | 'duvida') => {
  window.open(waUrl(procedure, kind), '_blank', 'noopener,noreferrer')
}
export const brl = (n: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(n)

// Extensão de cílios: valor da aplicação e da manutenção. Os demais serviços têm valor único (price).
export type Procedure = {
  id: number
  name: string
  group: 'cilios' | 'sobrancelhas'
  description: string
  detail?: string
  thread?: string // fio utilizado (técnicas de cílios)
  price?: number
  maintenance?: number
  photo: string // caminho da foto otimizada (960w)
  alt: string
}
export const procedures: Procedure[] = [
  { id: 1, name: 'Brasileiro', group: 'cilios', thread: 'Fio em Y', price: 90, maintenance: 70, photo: '/assets/servico-brasileiro-768.webp', alt: 'Extensão de cílios, técnica Brasileiro',
    description: 'Cílios em Y para um volume moderado e equilibrado.', detail: 'Nem exagerado, nem discreto demais: a escolha ideal para quem deseja um olhar marcante, com volume na medida certa.' },
  { id: 2, name: 'Egípcio', group: 'cilios', thread: 'Fio tecnológico (4 fios em um)', price: 90, maintenance: 70, photo: '/assets/servico-egipcio-768.webp', alt: 'Extensão de cílios, técnica Egípcio',
    description: 'Alongamento com efeito arqueado, que realça o olhar e valoriza os cílios externos.', detail: 'O volume mais delicado, com a base mais fininha: por isso não fica tão pretinho. O fio tecnológico tem 4 fios em um, aplicado sobre um fio natural, criando um olhar poderoso e sofisticado.' },
  { id: 3, name: 'Luxo', group: 'cilios', thread: 'Fio 5D (5 fios)', price: 90, maintenance: 70, photo: '/assets/servico-luxo-768.webp', alt: 'Extensão de cílios, técnica Luxo',
    description: 'O volume Luxo é o 5D: com 5 fios, o resultado fica mais cheio.', detail: 'Técnica perfeita para amantes de volume sem perder a elegância. Ideal para mulheres poderosas.' },
  { id: 4, name: 'Fox Eyes', group: 'cilios', price: 100, maintenance: 70, photo: '/assets/servico-fox-eyes-768.webp', alt: 'Extensão de cílios, técnica Fox Eyes',
    description: 'Um olhar mais alongado, elegante e marcante.', detail: 'O mapeamento é desenvolvido para alongar o canto externo dos olhos, valorizando os traços do rosto com leveza e naturalidade. Ideal para quem busca um visual refinado, sensual e inspirado nas maiores tendências da beleza.' },
  { id: 5, name: 'Glamour', group: 'cilios', thread: 'Fio U', price: 90, maintenance: 70, photo: '/assets/servico-glamour-768.webp', alt: 'Extensão de cílios, técnica Glamour',
    description: 'Efeito com leques mais fechados, para maior preenchimento e um olhar marcante.', detail: 'Perfeito para quem deseja cílios sofisticados, intensos e elegantes, bem cheios. O fio U é ideal para quem tem bastante cílios naturais.' },
  { id: 6, name: 'Design de sobrancelhas', group: 'sobrancelhas', price: 20, photo: '/assets/servico-sobrancelhas-768.webp', alt: 'Resultado de design de sobrancelhas',
    description: 'Beleza na medida certa: o design simples realça seu olhar de forma natural, leve e elegante.', detail: 'Perfeito para quem ama discrição sem perder o charme.' },
  { id: 7, name: 'Design com henna', group: 'sobrancelhas', price: 40, photo: '/assets/servico-henna-768.webp', alt: 'Resultado de design de sobrancelhas com henna',
    description: 'A henna proporciona um efeito de maquiagem temporária, tingindo tanto os fios quanto a pele.', detail: 'Garante um olhar mais marcante e definido.' },
]
// serviços avulsos, sem foto no catálogo
export const extras = [
  { name: 'Remoção de cílios', price: 20 },
  { name: 'Buço', price: 10 },
]

export const priceLabel = (p: Procedure) => (p.maintenance ? `Aplicação ${brl(p.price!)}\nManutenção ${brl(p.maintenance)}` : brl(p.price!))

export const differentials = [
  { icon: 'look', title: 'Técnica sob medida', text: 'Brasileiro, Egípcio, Luxo, Fox Eyes ou Glamour: você escolhe o efeito e o mapeamento é feito para o seu olhar.' },
  { icon: 'leaf', title: 'Do natural ao marcante', text: 'Cílios volumosos ou mais naturais, com a intensidade que combina com você.' },
  { icon: 'care', title: 'Calma e atenção aos detalhes', text: 'Um momento de cuidado, sem pressa e com paciência, para um resultado perfeito.' },
  { icon: 'calendar', title: 'Hora marcada', text: 'Atendimento de 2 a 3 horas reservado só para você.' },
] as const

export const steps = [
  { title: 'Conversa inicial', text: 'Você conta o que deseja e tira dúvidas pelo WhatsApp, sem compromisso.' },
  { title: 'Escolha da técnica', text: 'Brasileiro, Egípcio, Luxo, Fox Eyes ou Glamour: definimos o efeito ideal para o seu olhar.' },
  { title: 'Aplicação', text: 'Em média de 2 a 3 horas, com calma, cuidado e atenção aos detalhes.' },
  { title: 'Manutenção', text: 'Mantenha o volume e a beleza dos cílios com a manutenção, por um valor especial.' },
]

// Informações e restrições: texto do próprio catálogo da Karina (não acrescentar regras sem confirmar com ela).
export const infos = [
  { title: 'Duração do procedimento', text: 'O procedimento dura em média 2 a 3 horas, então é importante que você venha sem compromissos marcados logo depois.' },
  { title: 'Venha com calma', text: 'É um momento que exige calma, cuidado e bastante atenção aos detalhes. Venha tranquila, sem pressa e com paciência, para que possamos ter um resultado perfeito.' },
]
export const restrictions = [
  'Olhos com irritação, infecção ou inflamação (conjuntivite, terçol, blefarite).',
  'Alergia conhecida à cola ou aos produtos utilizados no procedimento.',
  'Uso de lentes de contato no dia (serão retiradas durante o procedimento).',
  'Queda excessiva dos cílios naturais.',
  'Gestantes.',
]
export const policiesThanks = 'Sua beleza, nosso propósito.'

export const faq = [
  { q: 'Como agendar?', a: 'Pelo botão de WhatsApp do site. Informe a técnica desejada e combinamos o melhor dia e horário.' },
  { q: 'Qual o horário de atendimento?', a: 'De segunda a sexta, das 8h às 12h, e aos sábados, das 8h às 20h.' },
  { q: 'Quanto tempo dura o procedimento?', a: 'Em média de 2 a 3 horas. Por isso, venha sem compromissos marcados logo depois.' },
  { q: 'Qual a diferença entre as técnicas?', a: 'Brasileiro (fio em Y) é um volume moderado e equilibrado. Egípcio é o mais delicado, com efeito arqueado. Luxo (5D) deixa os cílios mais cheios. Fox Eyes alonga o canto externo do olhar. Glamour (fio U) é bem cheio e intenso. Se tiver dúvida, chame no WhatsApp que ajudo você a escolher.' },
  { q: 'O que é aplicação e manutenção?', a: 'Aplicação é o valor da colocação dos cílios; manutenção é o valor para repor e manter o volume depois. Para saber o melhor prazo da sua manutenção, pergunte no WhatsApp.' },
  { q: 'Quem não pode fazer o procedimento?', a: 'Não é indicado em caso de olhos com irritação, infecção ou inflamação (conjuntivite, terçol, blefarite), alergia conhecida à cola ou aos produtos, queda excessiva dos cílios naturais e para gestantes.' },
  { q: 'Posso ir de lente de contato?', a: 'Pode, mas ela será retirada durante o procedimento.' },
  { q: 'Quais as formas de pagamento?', a: 'Pix, dinheiro e cartão (somente por aproximação).' },
]

export type Testimonial = { name: string; rating: number; text: string }
export const testimonials: Testimonial[] = [] // PREENCHER: depoimentos reais, com autorização das clientes
export const gallery: { before: string; after: string }[] = [] // PREENCHER: fotos reais de antes e depois, em /public
