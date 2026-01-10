const PromoBanner = () => {
  const promoText = "🚚 FREE DELIVERY on orders above ₹500  •  🔥 LIMITED TIME: Get 2 Facewash for just ₹500!  •  ";
  
  return (
    <div className="bg-primary text-primary-foreground py-2 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="mx-4 text-sm font-medium">
            {promoText}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PromoBanner;
