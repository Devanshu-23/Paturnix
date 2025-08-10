export const Shape = ({ icon: IconComponent, color, size = 'w-10 h-10' }) => {
  if (!IconComponent) {
    return null; // Don't render anything if no icon is provided
  }

  const combinedClasses = `${color} ${size}`;

  return (
    <IconComponent className={combinedClasses} strokeWidth={2.5} />
  );
};