import Image from "next/image";
import Link from "next/link";

interface Item {
  icon: string;
  label: string;
  href: string;
  visible: string[];
}

interface MenuItem {
  title: string;
  items: Item[];
}

function MenuItem({ item }: Readonly<{ item: MenuItem }>) {
  return (
    <div key={item.title} className="flex flex-col gap-2">
      <span className="hidden xl:block text-gray-400 font-light my-4">{item.title}</span>
      {item.items.map((i) => (
        <Link
          key={i.label}
          href={i.href}
          className="flex items-center justify-center xl:justify-start gap-4 text-gray-500 py-2"
        >
          <Image src={i.icon} alt={i.label} width={20} height={20} />
          <span className="hidden xl:block">{i.label}</span>
        </Link>
      ))}
    </div>
  );
}

export default MenuItem;
