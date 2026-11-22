import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Compass, Zap, CheckCircle2 } from 'lucide-react';

export const FOCUS_SLIDES = [
  {
    id: 1,
    tag: 'FOCUS NOTES · 1 OF 3',
    title: 'Plan your day',
    description: 'Organise your priorities and focus on what matters most. Group your deliverables and tackle high-impact items first.',
    tip: 'Pro tip: Time-block your top 3 tasks before opening your inbox.',
    icon: Compass,
    theme: 'teal'
  },
  {
    id: 2,
    tag: 'FOCUS NOTES · 2 OF 3',
    title: 'Deep Work Sessions',
    description: 'Block dedicated 45-minute uninterrupted intervals to make real progress on complex engineering and design tasks.',
    tip: 'Pro tip: Silence non-critical notifications during active focus blocks.',
    icon: Zap,
    theme: 'indigo'
  },
  {
    id: 3,
    tag: 'FOCUS NOTES · 3 OF 3',
    title: 'Review & Reflect',
    description: 'Track your completion metrics and celebrate small wins every day. Continuous incremental progress drives major milestones.',
    tip: 'Pro tip: Update task statuses at the end of every work session.',
    icon: CheckCircle2,
    theme: 'amber'
  }
];

export default function FocusNotes() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? FOCUS_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === FOCUS_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const active = FOCUS_SLIDES[currentSlide];
  const Icon = active.icon;

  return (
    <section className="focus-notes-section" aria-label="Focus Notes Carousel">
      <div className={`focus-notes-card focus-theme-${active.theme}`}>
        <div className="focus-notes-content">
          <div className="focus-notes-badge-row">
            <span className="focus-tag">{active.tag}</span>
            <div className="focus-icon-pill">
              <Icon size={16} />
            </div>
          </div>

          <h2 className="focus-title">{active.title}</h2>
          <p className="focus-desc">{active.description}</p>
          <div className="focus-tip">
            <span className="focus-tip-label">{active.tip}</span>
          </div>
        </div>

        <div className="focus-notes-controls">
          {/* Indicator Dots */}
          <div className="carousel-indicators" role="tablist" aria-label="Slide indicators">
            {FOCUS_SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={currentSlide === index}
                aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                className={`indicator-dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>

          {/* Prev / Next Action Buttons */}
          <div className="carousel-buttons">
            <button
              type="button"
              className="carousel-btn prev-btn"
              onClick={handlePrev}
              aria-label="Previous focus note slide"
              title="Previous slide"
            >
              <ChevronLeft size={18} />
              <span className="btn-label-desktop">Previous</span>
            </button>
            <button
              type="button"
              className="carousel-btn next-btn"
              onClick={handleNext}
              aria-label="Next focus note slide"
              title="Next slide"
            >
              <span className="btn-label-desktop">Next</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
