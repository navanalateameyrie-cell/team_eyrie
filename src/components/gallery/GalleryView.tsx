'use client'

import React, { useState, useEffect, useRef } from 'react'

export interface GalleryItem {
  id: string | number
  title: string
  category: string
  imageUrl: string
  images?: string[]
  caption?: string | null
  location?: string | null
  date?: string | null
}

const CATEGORIES = [
  { id: 'all', label: 'All Photos' },
  { id: 'events', label: 'Events & Celebrations' },
  { id: 'conferences', label: 'Seminars & Conferences' },
  { id: 'office', label: 'Office & Infrastructure' },
  { id: 'team', label: 'Team & Culture' },
  { id: 'client', label: 'Client Engagements' },
]

const CATEGORY_NAMES: Record<string, string> = {
  events: 'Events & Celebrations',
  conferences: 'Seminars & Conferences',
  office: 'Office & Infrastructure',
  team: 'Team & Culture',
  client: 'Client Engagements',
}

interface GalleryCardProps {
  item: GalleryItem
  onOpenModal: (item: GalleryItem, initialPhotoIndex: number) => void
  categoryName: string
}

function GalleryCard({ item, onOpenModal, categoryName }: GalleryCardProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const cardImages =
    item.images && item.images.length > 0 ? item.images : [item.imageUrl].filter(Boolean)
  const totalPhotos = cardImages.length
  const hasMultiple = totalPhotos > 1
  const activeImageUrl = cardImages[currentPhotoIndex] || item.imageUrl

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setCurrentPhotoIndex((prev) => (prev > 0 ? prev - 1 : totalPhotos - 1))
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setCurrentPhotoIndex((prev) => (prev < totalPhotos - 1 ? prev + 1 : 0))
  }

  return (
    <div
      onClick={() => onOpenModal(item, currentPhotoIndex)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: '#ffffff',
        border: isHovered ? '1.5px solid #cbd5e1' : '1.5px solid #e2e8f0',
        borderRadius: 14,
        overflow: 'hidden',
        boxShadow: isHovered
          ? '0 12px 28px rgba(15, 39, 74, 0.12)'
          : '0 4px 14px rgba(15, 39, 74, 0.04)',
        cursor: 'pointer',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Photo Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '62%', // 16:10 aspect ratio
          background: '#0b1324',
          overflow: 'hidden',
        }}
      >
        <img
          key={activeImageUrl}
          src={activeImageUrl}
          alt={item.title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease, opacity 0.25s ease',
            transform: isHovered ? 'scale(1.04)' : 'scale(1)',
          }}
        />

        {/* Category Badge (Top Left) */}
        <span
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            background: 'rgba(15, 39, 74, 0.85)',
            backdropFilter: 'blur(8px)',
            color: '#C09B5A',
            fontSize: 11,
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: 6,
            letterSpacing: 0.3,
            zIndex: 3,
            pointerEvents: 'none',
          }}
        >
          {categoryName}
        </span>

        {/* Multi-Photo Counter Badge (Top Right) */}
        {hasMultiple && (
          <div
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'rgba(15, 39, 74, 0.88)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#ffffff',
              fontSize: 11.5,
              fontWeight: 700,
              padding: '3px 9px',
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              zIndex: 3,
              pointerEvents: 'none',
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span>
              {currentPhotoIndex + 1}/{totalPhotos}
            </span>
          </div>
        )}

        {/* Side Arrow Navigation Icons for Multi-Image Cards */}
        {hasMultiple && (
          <>
            {/* Left / Previous Arrow */}
            <button
              type="button"
              onClick={handlePrev}
              className="gallery-card-arrow gallery-card-arrow--prev"
              title="Previous photo in this card"
              aria-label="Previous photo in this card"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Right / Next Arrow */}
            <button
              type="button"
              onClick={handleNext}
              className="gallery-card-arrow gallery-card-arrow--next"
              title="Next photo in this card"
              aria-label="Next photo in this card"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Bottom Dots Indicator */}
            {totalPhotos <= 8 && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  zIndex: 3,
                  background: 'rgba(8, 14, 28, 0.65)',
                  backdropFilter: 'blur(6px)',
                  padding: '3px 8px',
                  borderRadius: 16,
                }}
              >
                {cardImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      setCurrentPhotoIndex(idx)
                    }}
                    aria-label={`View photo ${idx + 1}`}
                    style={{
                      padding: 0,
                      border: 'none',
                      background:
                        idx === currentPhotoIndex ? '#ea580c' : 'rgba(255, 255, 255, 0.55)',
                      width: idx === currentPhotoIndex ? 14 : 5,
                      height: 5,
                      borderRadius: 3,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* View / Zoom Indicator (Bottom Right) */}
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(4px)',
            color: '#ffffff',
            width: 28,
            height: 28,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            zIndex: 2,
            transition: 'background 0.2s ease',
          }}
          title="Click to expand full album view"
        >
          🔍
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div style={{ padding: '18px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 8,
            fontSize: 12,
            color: '#64748b',
          }}
        >
          {item.location && <span>📍 {item.location}</span>}
          {item.date && <span>📅 {item.date}</span>}
          {hasMultiple && (
            <span
              style={{
                marginLeft: 'auto',
                fontSize: 11,
                color: '#ea580c',
                fontWeight: 700,
                letterSpacing: 0.2,
              }}
            >
              {totalPhotos} photos
            </span>
          )}
        </div>
        <h3
          style={{
            fontSize: 16.5,
            fontWeight: 700,
            color: '#0f274a',
            margin: '0 0 8px',
            lineHeight: 1.4,
          }}
        >
          {item.title}
        </h3>
        {item.caption && (
          <p
            style={{
              fontSize: 13.5,
              color: '#64748b',
              lineHeight: 1.6,
              margin: 0,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {item.caption}
          </p>
        )}
      </div>
    </div>
  )
}

export default function GalleryView({ items }: { items: GalleryItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null)
  const [modalPhotoIndex, setModalPhotoIndex] = useState(0)
  const thumbnailContainerRef = useRef<HTMLDivElement>(null)

  const filteredItems =
    selectedCategory === 'all'
      ? items
      : items.filter((item) => item.category === selectedCategory)

  const activeIndex = activeItem ? filteredItems.findIndex((it) => it.id === activeItem.id) : -1

  const activePhotos =
    activeItem && activeItem.images && activeItem.images.length > 0
      ? activeItem.images
      : activeItem
        ? [activeItem.imageUrl].filter(Boolean)
        : []

  const handleOpenModal = (item: GalleryItem, initialPhotoIndex = 0) => {
    setActiveItem(item)
    setModalPhotoIndex(initialPhotoIndex)
  }

  const handleNextItem = () => {
    if (activeIndex >= 0 && activeIndex < filteredItems.length - 1) {
      setActiveItem(filteredItems[activeIndex + 1])
    } else {
      setActiveItem(filteredItems[0])
    }
    setModalPhotoIndex(0)
  }

  const handlePrevItem = () => {
    if (activeIndex > 0) {
      setActiveItem(filteredItems[activeIndex - 1])
    } else {
      setActiveItem(filteredItems[filteredItems.length - 1])
    }
    setModalPhotoIndex(0)
  }

  const handleNextPhoto = () => {
    if (activePhotos.length <= 1) return
    setModalPhotoIndex((prev) => (prev < activePhotos.length - 1 ? prev + 1 : 0))
  }

  const handlePrevPhoto = () => {
    if (activePhotos.length <= 1) return
    setModalPhotoIndex((prev) => (prev > 0 ? prev - 1 : activePhotos.length - 1))
  }

  // Keyboard navigation: Escape to close, arrows to cycle
  useEffect(() => {
    if (!activeItem) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveItem(null)
      if (e.key === 'ArrowRight') {
        if (activePhotos.length > 1) {
          handleNextPhoto()
        } else {
          handleNextItem()
        }
      }
      if (e.key === 'ArrowLeft') {
        if (activePhotos.length > 1) {
          handlePrevPhoto()
        } else {
          handlePrevItem()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeItem, activeIndex, filteredItems, activePhotos, modalPhotoIndex])

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    if (!activeItem || !thumbnailContainerRef.current) return
    const container = thumbnailContainerRef.current
    const activeThumb = container.querySelector('[data-active="true"]') as HTMLElement | null
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }, [activeItem])

  return (
    <div>
      <style>{`
        .gallery-card-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(15, 39, 74, 0.88);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1.5px solid rgba(255, 255, 255, 0.35);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 5;
          opacity: 0.92;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.32);
          padding: 0;
        }

        .gallery-card-arrow--prev {
          left: 10px;
        }

        .gallery-card-arrow--next {
          right: 10px;
        }

        .gallery-card-arrow:hover {
          background: #ea580c;
          border-color: #ea580c;
          color: #ffffff;
          opacity: 1;
          transform: translateY(-50%) scale(1.12);
          box-shadow: 0 6px 16px rgba(234, 88, 12, 0.5);
        }

        .gallery-card-arrow:active {
          transform: translateY(-50%) scale(0.95);
        }

        .gallery-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 99999;
          background: rgba(8, 14, 28, 0.92);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: galleryFadeIn 0.2s ease-out;
        }

        @keyframes galleryFadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }

        .gallery-modal-card {
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.55);
          width: min(94vw, 1060px);
          height: min(88vh, 620px);
          display: flex;
          flex-direction: row;
          overflow: hidden;
          position: relative;
        }

        .gallery-modal-image-col {
          flex: 1.25;
          background: #0b1324;
          position: relative;
          height: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gallery-modal-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        .gallery-modal-photo-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(15, 39, 74, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1.5px solid rgba(255, 255, 255, 0.35);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 6;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
          padding: 0;
        }

        .gallery-modal-photo-arrow--prev {
          left: 14px;
        }

        .gallery-modal-photo-arrow--next {
          right: 14px;
        }

        .gallery-modal-photo-arrow:hover {
          background: #ea580c;
          border-color: #ea580c;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 6px 18px rgba(234, 88, 12, 0.5);
        }

        .gallery-modal-info-col {
          flex: 1;
          background: #ffffff;
          padding: 32px 34px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          box-sizing: border-box;
          overflow-y: auto;
        }

        .gallery-info-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .gallery-info-counter {
          font-size: 13.5px;
          font-weight: 600;
          color: #475569;
          letter-spacing: 0.3px;
        }

        .gallery-info-close {
          background: transparent;
          border: none;
          color: #0f274a;
          font-size: 20px;
          cursor: pointer;
          padding: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          transition: transform 0.15s ease, color 0.15s ease;
        }

        .gallery-info-close:hover {
          color: #ea580c;
          transform: scale(1.15);
        }

        .gallery-info-category {
          color: #ea580c;
          font-size: 11.5px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }

        .gallery-info-title {
          font-size: 26px;
          font-weight: 800;
          color: #0b1e3b;
          margin: 0 0 12px;
          font-family: var(--font-heading), "Cinzel", Georgia, serif;
          line-height: 1.25;
        }

        .gallery-info-caption {
          font-size: 14px;
          color: #475569;
          line-height: 1.65;
          margin: 0 0 16px;
        }

        .gallery-info-meta {
          display: flex;
          align-items: center;
          gap: 20px;
          font-size: 13px;
          color: #334155;
          font-weight: 600;
        }

        .gallery-item-photos-strip {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 4px 2px;
          margin: 14px 0 0;
          scrollbar-width: thin;
        }

        .gallery-item-photo-thumb {
          width: 50px;
          height: 36px;
          border-radius: 6px;
          overflow: hidden;
          cursor: pointer;
          flex-shrink: 0;
          border: 1.5px solid #e2e8f0;
          opacity: 0.7;
          transition: all 0.2s ease;
          padding: 0;
          background: #f1f5f9;
        }

        .gallery-item-photo-thumb--active {
          border: 2px solid #ea580c;
          opacity: 1;
          box-shadow: 0 2px 6px rgba(234, 88, 12, 0.35);
          transform: scale(1.04);
        }

        .gallery-thumbnail-list {
          display: flex;
          gap: 8px;
          align-items: center;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          flex: 1;
          padding: 4px 2px;
        }

        .gallery-thumbnail-list::-webkit-scrollbar {
          display: none;
        }

        .gallery-thumb-btn {
          width: 58px;
          height: 42px;
          border-radius: 6px;
          overflow: hidden;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.18s ease;
          border: 1.5px solid #e2e8f0;
          opacity: 0.72;
          padding: 0;
          background: #f8fafc;
        }

        .gallery-thumb-btn--active {
          border: 2.5px solid #ea580c;
          opacity: 1;
          box-shadow: 0 2px 8px rgba(234, 88, 12, 0.3);
          transform: scale(1.03);
        }

        .gallery-thumb-btn:hover {
          opacity: 1;
        }

        .gallery-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .gallery-nav-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #f1f5f9;
          border: 1.5px solid #e2e8f0;
          color: #334155;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.15s ease;
        }

        .gallery-nav-btn:hover {
          background: #e2e8f0;
          border-color: #cbd5e1;
          color: #0f274a;
        }

        @media (max-width: 820px) {
          .gallery-modal-card {
            flex-direction: column;
            height: auto;
            max-height: 90vh;
            overflow-y: auto;
          }
          .gallery-modal-image-col {
            height: 280px;
            flex: none;
          }
          .gallery-modal-info-col {
            padding: 24px 20px;
            flex: none;
          }
          .gallery-info-title {
            font-size: 22px;
          }
        }
      `}</style>

      {/* Category Filter Pills */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          justifyContent: 'center',
          marginBottom: 44,
        }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id
          const count =
            cat.id === 'all' ? items.length : items.filter((i) => i.category === cat.id).length
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                fontFamily: 'inherit',
                fontSize: 13.5,
                fontWeight: isActive ? 700 : 600,
                padding: '8px 18px',
                borderRadius: 30,
                border: isActive ? '1.5px solid #1a4b8c' : '1.5px solid #e2e8f0',
                background: isActive ? '#1a4b8c' : '#ffffff',
                color: isActive ? '#ffffff' : '#475569',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: isActive ? '0 4px 12px rgba(26, 75, 140, 0.2)' : 'none',
              }}
            >
              <span>{cat.label}</span>
              <span
                style={{
                  fontSize: 11.5,
                  padding: '2px 7px',
                  borderRadius: 12,
                  background: isActive ? 'rgba(255, 255, 255, 0.2)' : '#f1f5f9',
                  color: isActive ? '#ffffff' : '#64748b',
                }}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Grid of Photo Cards */}
      {filteredItems.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: '#f8fafc',
            borderRadius: 12,
            border: '1.5px dashed #cbd5e1',
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 10 }}>📷</div>
          <h3 style={{ fontSize: 18, color: '#0f274a', margin: '0 0 6px' }}>
            No photos in this category yet
          </h3>
          <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>
            New photographs and event highlights are updated regularly by our media team.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 24,
          }}
        >
          {filteredItems.map((item) => (
            <GalleryCard
              key={item.id}
              item={item}
              onOpenModal={handleOpenModal}
              categoryName={CATEGORY_NAMES[item.category] || item.category}
            />
          ))}
        </div>
      )}

      {/* Split-Card Modal (Image on Left, Clean Panel on Right with Multi-Photo Controls) */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="gallery-modal-backdrop"
          onClick={() => setActiveItem(null)}
        >
          <div className="gallery-modal-card" onClick={(e) => e.stopPropagation()}>
            {/* LEFT SIDE: Full-Bleed Photograph with Photo Navigation */}
            <div className="gallery-modal-image-col">
              <img
                src={activePhotos[modalPhotoIndex] || activeItem.imageUrl}
                alt={activeItem.title}
                className="gallery-modal-image"
              />

              {/* Side Arrows on Large Modal Photograph if card has multiple photos */}
              {activePhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevPhoto}
                    className="gallery-modal-photo-arrow gallery-modal-photo-arrow--prev"
                    title="Previous photo in this album"
                    aria-label="Previous photo in this album"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={handleNextPhoto}
                    className="gallery-modal-photo-arrow gallery-modal-photo-arrow--next"
                    title="Next photo in this album"
                    aria-label="Next photo in this album"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>

                  {/* Photo counter on modal image */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 14,
                      left: 14,
                      background: 'rgba(15, 39, 74, 0.88)',
                      backdropFilter: 'blur(8px)',
                      color: '#ffffff',
                      fontSize: 12,
                      fontWeight: 700,
                      padding: '4px 12px',
                      borderRadius: 20,
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      pointerEvents: 'none',
                    }}
                  >
                    Photo {modalPhotoIndex + 1} of {activePhotos.length}
                  </div>
                </>
              )}
            </div>

            {/* RIGHT SIDE: Clean White Content Panel */}
            <div className="gallery-modal-info-col">
              {/* Header: Logo on Left + Counter & Close on Right */}
              <div className="gallery-info-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <img
                    src="/logo.png"
                    alt="Team Eyrie"
                    style={{ height: '34px', width: 'auto', objectFit: 'contain' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span className="gallery-info-counter">
                    Item {activeIndex + 1} / {filteredItems.length}
                  </span>
                  <button
                    onClick={() => setActiveItem(null)}
                    className="gallery-info-close"
                    title="Close (Esc)"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Middle Section: Category, Heading, Story, Metadata, Multi-Photo Strip */}
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div className="gallery-info-category">
                  {CATEGORY_NAMES[activeItem.category] || activeItem.category}
                </div>

                <h2 className="gallery-info-title">{activeItem.title}</h2>

                <p className="gallery-info-caption">
                  {activeItem.caption ||
                    'Our team enjoyed a refreshing day together, strengthening bonds and creating memories beyond work.'}
                </p>

                <div className="gallery-info-meta">
                  {activeItem.location && <span>📍 {activeItem.location}</span>}
                  {activeItem.date && <span>📅 {activeItem.date}</span>}
                  {activePhotos.length > 1 && (
                    <span style={{ color: '#ea580c', fontWeight: 700 }}>
                      📸 {activePhotos.length} Photos in this Album
                    </span>
                  )}
                </div>

                {/* Album Photo Strip if this card has multiple photos */}
                {activePhotos.length > 1 && (
                  <div style={{ marginTop: 16 }}>
                    <div
                      style={{
                        fontSize: 11.5,
                        fontWeight: 700,
                        color: '#64748b',
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                        marginBottom: 6,
                      }}
                    >
                      Album Photos ({modalPhotoIndex + 1}/{activePhotos.length})
                    </div>
                    <div className="gallery-item-photos-strip">
                      {activePhotos.map((photoUrl, idx) => {
                        const isCurrentPhoto = idx === modalPhotoIndex
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setModalPhotoIndex(idx)}
                            className={`gallery-item-photo-thumb ${isCurrentPhoto ? 'gallery-item-photo-thumb--active' : ''
                              }`}
                            title={`View photo ${idx + 1}`}
                          >
                            <img
                              src={photoUrl}
                              alt={`${activeItem.title} ${idx + 1}`}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: '#e2e8f0', margin: '16px 0 14px' }} />

              {/* Bottom Carousel: Left Arrow + Category Item Thumbnails + Right Arrow */}
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    marginBottom: 6,
                  }}
                >
                  Other Albums in this Category
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    justifyContent: 'space-between',
                  }}
                >
                  <button
                    onClick={handlePrevItem}
                    className="gallery-nav-btn"
                    title="Previous album (← Arrow)"
                  >
                    ‹
                  </button>

                  <div ref={thumbnailContainerRef} className="gallery-thumbnail-list">
                    {filteredItems.map((it) => {
                      const isCurrent = it.id === activeItem.id
                      return (
                        <button
                          key={it.id}
                          data-active={isCurrent ? 'true' : 'false'}
                          onClick={() => {
                            setActiveItem(it)
                            setModalPhotoIndex(0)
                          }}
                          className={`gallery-thumb-btn ${isCurrent ? 'gallery-thumb-btn--active' : ''
                            }`}
                          title={it.title}
                        >
                          <img src={it.imageUrl} alt={it.title} className="gallery-thumb-img" />
                        </button>
                      )
                    })}
                  </div>

                  <button
                    onClick={handleNextItem}
                    className="gallery-nav-btn"
                    title="Next album (→ Arrow)"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
