interface SectionProps {
  isLast?: boolean;
  children: React.ReactNode;
  isEditing?: boolean;
}

const Section = ({
  isLast = false,
  children,
  isEditing = false,
}: SectionProps) => {
  const baseClasses =
    "border-t w-full py-2.5 px-4 flex flex-row border-[#e9ebef] !text-[#1c1d20] !opacity-[0.92]";
  const borderBottom = isLast ? "border-b" : "border-b-0";
  const background = isEditing ? "bg-[#f9fafb]" : "bg-white hover:bg-[#f9fafb]";

  return (
    <div className={`${baseClasses} ${borderBottom} ${background}`}>
      {children}
    </div>
  );
};

export default Section;
