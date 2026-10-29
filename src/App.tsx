import { useState } from 'react'
import type { ReactNode } from 'react'

const productImages = [
  '/images/image-product-1.jpg',
  '/images/image-product-2.jpg',
  '/images/image-product-3.jpg',
  '/images/image-product-4.jpg',
]

const thumbnailImages = [
  '/images/image-product-1-thumbnail.jpg',
  '/images/image-product-2-thumbnail.jpg',
  '/images/image-product-3-thumbnail.jpg',
  '/images/image-product-4-thumbnail.jpg',
]

const productPrice = 125

function CartIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 8H6" />
      <circle cx="10" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

function MinusIcon() {
  return (
    <svg
      width="12"
      height="4"
      viewBox="0 0 12 4"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M1 0h10a1 1 0 0 1 0 2H1a1 1 0 0 1 0-2Z" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M5 0h2v12H5zM0 5h12v2H0z" />
    </svg>
  )
}

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      width="12"
      height="18"
      viewBox="0 0 12 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={direction === 'left' ? 'M10 1 2 9l8 8' : 'M2 1l8 8-8 8'} />
    </svg>
  )
}

function Header({
  cartCount,
  onCartClick,
}: {
  cartCount: number
  onCartClick: () => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = ['Collections', 'Men', 'Women', 'About', 'Contact']

  return (
    <header className="relative z-20 mx-auto max-w-[1110px] border-b border-[#e8e8e8] px-6 md:px-0">
      <div className="flex h-[82px] items-center justify-between md:h-[112px]">
        <div className="flex items-center gap-4 md:gap-14">
          <button
            className="text-[#69707d] md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          <a
            href="#home"
            className="text-[28px] font-extrabold tracking-[-1.5px] text-[#1d2025]"
          >
            sneakers
          </a>

          <nav className="hidden h-[112px] items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#product"
                className="flex h-full items-center border-b-4 border-transparent pt-1 text-[15px] text-[#69707d] transition hover:border-[#ff7d1a] hover:text-[#1d2025]"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-5 md:gap-11">
          <button
            onClick={onCartClick}
            className="relative text-[#69707d] transition hover:text-[#1d2025]"
            aria-label={`Shopping cart, ${cartCount} items`}
          >
            <CartIcon />

            {cartCount > 0 && (<span className="absolute -right-2 -top-2 flex h-[17px] min-w-[22px] items-center justify-center rounded-full bg-[#ff7d1a] px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          <button
            className="rounded-full border-2 border-transparent transition hover:border-[#ff7d1a]"
            aria-label="User profile"
          >
            <img
              src="/images/image-avatar.png"
              alt="User avatar"
              className="h-7 w-7 rounded-full object-cover md:h-[50px] md:w-[50px]"
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="absolute left-0 top-[82px] z-50 flex min-h-[calc(100vh-82px)] w-[75%] flex-col gap-6 bg-white p-6 shadow-xl md:hidden">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#product"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-bold text-[#1d2025]"
            >
              {link}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

function ProductGallery({
  selectedImage,
  setSelectedImage,
  onOpenLightbox,
}: {
  selectedImage: number
  setSelectedImage: (index: number) => void
  onOpenLightbox: () => void
}) {
  const changeImage = (direction: number) => {
    setSelectedImage(
      (selectedImage + direction + productImages.length) %
        productImages.length,
    )
  }

  return (
    <div className="w-full md:max-w-[445px]">
      <div className="group relative">
        <button
          onClick={onOpenLightbox}
          className="block w-full cursor-zoom-in overflow-hidden md:rounded-2xl"
          aria-label="Open product image gallery"
        >
          <img
            src={productImages[selectedImage]}
            alt={`Orange and white sneakers, image ${selectedImage + 1}`}
            className="aspect-square w-full object-cover"
          />
        </button>

        <button
          onClick={() => changeImage(-1)}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1d2025] shadow md:hidden"
        >
          <Chevron direction="left" />
        </button>

        <button
          onClick={() => changeImage(1)}
          aria-label="Next image"
          className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1d2025] shadow md:hidden"
        >
          <Chevron direction="right" />
        </button>
      </div>

      <div className="mt-8 hidden grid-cols-4 gap-[30px] md:grid">
        {thumbnailImages.map((image, index) => (
          <button
            key={image}
            onClick={() => setSelectedImage(index)}
            aria-label={`Show product image ${index + 1}`}
            aria-pressed={selectedImage === index}
            className={`overflow-hidden rounded-xl border-2 transition ${
              selectedImage === index
                ? 'border-[#ff7d1a]'
                : 'border-transparent hover:opacity-75'
            }`}
          >
            <img
              src={image}
              alt={`Product thumbnail ${index + 1}`}
              className={`aspect-square w-full object-cover ${
                selectedImage === index ? 'opacity-40' : ''
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

function ProductInfo({
  quantity,
  setQuantity,
  onAddToCart,
}: {
  quantity: number
  setQuantity: (quantity: number) => void
  onAddToCart: () => void
}) {
  return (
    <section
      id="product"
      className="w-full px-6 pb-20 pt-6 md:max-w-[445px] md:px-0 md:pb-0 md:pt-0"
    >
      <p className="text-[12px] font-bold uppercase tracking-[2px] text-[#68707d] md:text-[13px]">
        Sneaker Company
      </p>

      <h1 className="mt-4 text-[28px] font-bold leading-[1.12] tracking-[-0.7px] text-[#1d2025] md:mt-5 md:text-[44px] md:leading-[1.1]">
        Fall Limited Edition Sneakers
      </h1>

      <p className="mt-4 text-[15px] leading-[1.7] text-[#68707d] md:mt-8 md:text-[16px]">
        These low-profile sneakers are your perfect casual wear companion.
        Featuring a durable rubber outer sole, they&apos;ll withstand
        everything the weather can offer.
      </p>

      <div className="mt-5 flex items-center justify-between md:mt-6 md:block">
        <div className="flex items-center gap-4">
          <span className="text-[28px] font-bold tracking-[-1px] text-[#1d2025]">
            $125.00
          </span>

          <span className="rounded-md bg-[#1d2025] px-2 py-1 text-[15px] font-bold text-white">
            50%
          </span>
        </div>

        <p className="text-[16px] font-bold text-[#b6bcc8] line-through md:mt-2">
          $250.00
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-4 md:mt-8 md:flex-row">
        <div className="flex h-14 items-center justify-between rounded-lg bg-[#f7f8fd] md:w-[157px]">
          <button
            onClick={() => setQuantity(Math.max(0, quantity - 1))}
            disabled={quantity === 0}
            aria-label="Decrease quantity"
            className="flex h-full w-12 items-center justify-center text-[#ff7d1a] transition hover:opacity-60 disabled:opacity-30"
          >
            <MinusIcon />
          </button>

          <span className="font-bold text-[#1d2025]">{quantity}</span>

          <button
            onClick={() => setQuantity(quantity + 1)}
            aria-label="Increase quantity"
            className="flex h-full w-12 items-center justify-center text-[#ff7d1a] transition hover:opacity-60"
          >
            <PlusIcon />
          </button>
        </div>

        <button
          onClick={onAddToCart}
          disabled={quantity === 0}
          className="flex h-14 flex-1 items-center justify-center gap-4 rounded-lg bg-[#ff7d1a] font-bold text-[#1d2025] shadow-[0_12px_24px_rgba(255,125,26,0.22)] transition hover:bg-[#ffac6a] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CartIcon />
          Add to cart
        </button>
      </div>
    </section>
  )
}

function Cart({
  quantity,
  onDelete,
  onCheckout,
}: {
  quantity: number
  onDelete: () => void
  onCheckout: () => void
}) {
  return (
    <div className="absolute right-2 top-[72px] z-50 w-[calc(100vw-16px)] max-w-[360px] rounded-xl bg-white shadow-[0_15px_40px_rgba(0,0,0,0.18)] md:right-[-75px] md:top-[90px]">
      <div className="border-b border-[#e8e8e8] px-6 py-5">
        <h2 className="font-bold text-[#1d2025]">Cart</h2>
      </div>

      <div className="p-6">
        {quantity === 0 ? (
          <p className="flex h-[100px] items-center justify-center text-sm font-bold text-[#69707d]">
            Your cart is empty.
          </p>
        ) : (
          <>
            <div className="flex items-center gap-4">
              <img
                src={thumbnailImages[0]}
                alt="Fall Limited Edition Sneakers"
                className="h-[50px] w-[50px] rounded-md object-cover"
              />

              <div className="min-w-0 flex-1 text-[14px] leading-6 text-[#69707d]">
                <p className="truncate">Fall Limited Edition Sneakers</p>

                <p>
                  $125.00 × {quantity}{' '}
                  <span className="font-bold text-[#1d2025]">
                    ${(productPrice * quantity).toFixed(2)}
                  </span>
                </p>
              </div>

              <button
                onClick={onDelete}
                aria-label="Remove product from cart"
                className="text-[#b6bcc8] transition hover:text-[#1d2025]"
              >
                <svg
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="currentColor"
                  aria-hidden="true"
                ><path d="M1 3h12v1H1zm3 2h1v8H4zm5 0h1v8H9zM3 1h8l1 2H2zm0 3h8l-.5 10h-7z" />
                </svg>
              </button>
            </div>

            <button
              onClick={onCheckout}
              className="mt-6 h-14 w-full rounded-lg bg-[#ff7d1a] font-bold text-[#1d2025] transition hover:bg-[#ffac6a]"
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  )
}

function Lightbox({
  selectedImage,
  setSelectedImage,
  onClose,
}: {
  selectedImage: number
  setSelectedImage: (index: number) => void
  onClose: () => void
}) {
  const changeImage = (direction: number) => {
    setSelectedImage(
      (selectedImage + direction + productImages.length) %
        productImages.length,
    )
  }

  return (
    <div
      className="fixed inset-0 z-[100] hidden items-center justify-center bg-black/80 md:flex"
      onClick={onClose}
    >
      <div
        className="relative w-[445px]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close gallery"
          className="absolute -right-1 -top-12 text-white transition hover:text-[#ff7d1a]"
        >
          <CloseIcon />
        </button>

        <div className="relative">
          <img
            src={productImages[selectedImage]}
            alt={`Product image ${selectedImage + 1}`}
            className="aspect-square w-full rounded-2xl object-cover"
          />

          <button
            onClick={() => changeImage(-1)}
            aria-label="Previous image"
            className="absolute -left-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1d2025] transition hover:text-[#ff7d1a]"
          >
            <Chevron direction="left" />
          </button>

          <button
            onClick={() => changeImage(1)}
            aria-label="Next image"
            className="absolute -right-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1d2025] transition hover:text-[#ff7d1a]"
          >
            <Chevron direction="right" />
          </button>
        </div>

        <div className="mx-auto mt-8 grid w-[88%] grid-cols-4 gap-6">
          {thumbnailImages.map((image, index) => (
            <button
              key={image}
              onClick={() => setSelectedImage(index)}
              aria-label={`Show image ${index + 1}`}
              className={`overflow-hidden rounded-xl border-2 ${
                selectedImage === index
                  ? 'border-[#ff7d1a]'
                  : 'border-transparent'
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`aspect-square w-full object-cover transition hover:opacity-70 ${
                  selectedImage === index ? 'opacity-40' : ''
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function App() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [cartQuantity, setCartQuantity] = useState(0)
  const [cartOpen, setCartOpen] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const addToCart = () => {
    if (quantity > 0) {
      setCartQuantity((previous) => previous + quantity)
      setCartOpen(true)
    }
  }

  const checkout = () => {
    window.alert('Checkout is a demo. No payment has been processed.')
  }

  const pageContent: ReactNode = (
    <>
      <Header
        cartCount={cartQuantity}
        onCartClick={() => setCartOpen((previous) => !previous)}
      />

      <main
        id="home"
        className="mx-auto flex max-w-[1015px] flex-col gap-6 md:mt-[90px] md:flex-row md:items-center md:justify-between md:gap-10"
      >
        <ProductGallery
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}onOpenLightbox={() => setLightboxOpen(true)}
        />

        <ProductInfo
          quantity={quantity}
          setQuantity={setQuantity}
          onAddToCart={addToCart}
        />
      </main>

      {cartOpen && (
        <Cart
          quantity={cartQuantity}
          onDelete={() => setCartQuantity(0)}
          onCheckout={checkout}
        />
      )}

      {lightboxOpen && (
        <Lightbox
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  )

  return (
    <div className="min-h-screen bg-white font-sans text-[#1d2025]">
      <div className="relative mx-auto max-w-[1110px]">
        {pageContent}
      </div>
    </div>
  )
}

export default App