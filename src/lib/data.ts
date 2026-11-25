// Conteúdo do site, tirado do catálogo da Karina Fernandes (PDF). Campos marcados com "PREENCHER" não constam
// no catálogo e ficam ocultos na página enquanto estiverem vazios — nada é inventado.
export const WHATSAPP = '553597549665' // DDI 55 + DDD 35 + número (só dígitos)
export const brand = {
  name: 'Karina Fernandes',
  role: 'Lash Designer',
}
export const contact = {
  instagram: '', // PREENCHER: usuário do Instagram, sem @
  address: '', // PREENCHER: endereço completo (mostra o mapa e o endereço no rodapé)
  mapsUrl: '', // PREENCHER: link do Google Maps (opcional)
  hours: 'Seg a Sex, 8h às 20h · Sáb, 9h às 16h',
}
export const schedule = [
  { days: 'Seg a Sex', time: '8:00 às 20:00' },
  { days: 'Sábado', time: '9:00 às 16:00' },
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
  { id: 6, name: 'Design de sobrancelhas', group: 'sobrancelhas', price: 20, photo: '/assets/servico-sobrancelhas-768.webp', alt: 'Cliente com design de sobrancelhas personalizado e extensão de cílios',
    description: 'Beleza na medida certa: o design simples realça seu olhar de forma natural, leve e elegante.', detail: 'Perfeito para quem ama discrição sem perder o charme.' },
  { id: 7, name: 'Design com henna', group: 'sobrancelhas', price: 40, photo: '/assets/servico-henna-768.webp', alt: 'Cliente com design de sobrancelhas com henna',
    description: 'A henna proporciona um efeito de maquiagem temporária, tingindo tanto os fios quanto a pele.', detail: 'Garante um olhar mais marcante e definido.' },
  { id: 8, name: 'Brow', group: 'sobrancelhas', price: 90, maintenance: 70, photo: '/assets/servico-brow-768.webp', alt: 'Olho com sobrancelha e cílios alongados',
    description: '' },
]
// serviços avulsos, sem foto no catálogo
export const extras = [
  { name: 'Remoção de cílios', price: 20 },
  { name: 'Buço', price: 10 },
]

export const priceLabel = (p: Procedure) => (p.maintenance ? `Aplicação ${brl(p.price!)}\nManutenção ${brl(p.maintenance)}` : brl(p.price!))

export const differentials = [
  { icon: 'look', title: 'Técnica sob medida', text: 'Você escolhe o efeito; o mapeamento é feito para o seu olhar.' },
  { icon: 'leaf', title: 'Do natural ao marcante', text: 'Na intensidade que combina com você.' },
  { icon: 'care', title: 'Calma e atenção', text: 'Sem pressa, para um resultado perfeito.' },
  { icon: 'calendar', title: 'Hora marcada', text: 'De 2 a 3 horas só para você.' },
] as const

export const steps = [
  { title: 'Conversa inicial', text: 'Você conta o que deseja, sem compromisso.' },
  { title: 'Escolha da técnica', text: 'Definimos o efeito ideal para o seu olhar.' },
  { title: 'Aplicação', text: 'De 2 a 3 horas, com calma e cuidado.' },
  { title: 'Manutenção', text: 'Volume e beleza por mais tempo, por um valor especial.' },
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
  { q: 'Como agendar?', a: 'Pelo WhatsApp do site.' },
  { q: 'Qual o horário?', a: 'Seg a sex, 8h às 20h. Sáb, 9h às 16h.' },
  { q: 'Quanto tempo dura?', a: 'De 2 a 3 horas.' },
  { q: 'Qual técnica escolher?', a: 'Do mais delicado ao mais cheio. Chame no WhatsApp e eu ajudo você a escolher.' },
  { q: 'O que é manutenção?', a: 'É a reposição que mantém o volume depois da aplicação.' },
  { q: 'Quem não pode fazer?', a: 'Olhos irritados ou inflamados, alergia à cola, queda excessiva dos cílios e gestantes.' },
  { q: 'Pagamento?', a: 'Pix, dinheiro e cartão por aproximação.' },
]

export type Testimonial = { name: string; rating: number; text: string }
export const testimonials: Testimonial[] = [] // PREENCHER: depoimentos reais, com autorização das clientes
export const gallery: { before: string; after: string }[] = [] // PREENCHER: fotos reais de antes e depois, em /public
