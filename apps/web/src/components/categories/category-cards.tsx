import { HeartPulse, PenTool, PiggyBank, Ticket, Utensils } from "lucide-react";
import CardCategoryItem from "../ui/card-category-item";

export default function CategoryCards() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
      <CardCategoryItem
        id="1"
        name="Alimentação"
        description="Despesas com comida e restaurantes"
        color="green"
        itemsCount={5}
        icon={Utensils}
      />

      <CardCategoryItem
        id="2"
        name="Utilidades"
        description="Energia, água, internet e telefone"
        color="yellow"
        itemsCount={7}
        icon={PenTool}
      />

      <CardCategoryItem
        id="3"
        name="Entretenimento"
        description="Cinema, jogos e lazer"
        color="pink"
        itemsCount={2}
        icon={Ticket}
      />

      <CardCategoryItem
        id="4"
        name="Investimento"
        description="Aplicações financeiras e poupança"
        color="green"
        itemsCount={1}
        icon={PiggyBank}
      />

      <CardCategoryItem
        id="5"
        name="Saúde"
        description="Despesas com saúde e bem-estar"
        color="red"
        itemsCount={5}
        icon={HeartPulse}
      />
    </section>
  )
}