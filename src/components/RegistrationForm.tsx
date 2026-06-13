import { useState, type FormEvent } from 'react';

interface RegistrationFormProps {
  onRegister: (name: string) => void;
}

export default function RegistrationForm({ onRegister }: RegistrationFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const [setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) return;
    
    setIsLoading(true);
    
    // Simulate registration delay for animation
    setTimeout(() => {
      localStorage.setItem('userName', name);
      localStorage.setItem('isRegistered', 'true');
      onRegister(name);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden ">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-red-400 to-pink-500">
        <div className="absolute inset-0">
          {/* Floating shapes */}
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
          <div className="floating-shape shape-4"></div>
        </div>
      </div>

      {/* Card Container */}
      <div className="registration-card ">
        {/* Food Icons Decorations */}
        <div className="food-icons">
          <span className="food-icon icon-1">🍕</span>
          <span className="food-icon icon-2">🍔</span>
          <span className="food-icon icon-3">🍣</span>
          <span className="food-icon icon-4">🌮</span>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="logo-container">
            <span className="logo-emoji">🍴</span>
          </div>
          <h1 className="text-4xl font-bold text-[#ff6f58] mb-2 drop-shadow-lg">
            Swipe Food
          </h1>
          <p className="text-black/100 text-lg">Discover your next favorite meal!</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div className="form-field">
      
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="field-input"
              placeholder="Enter your name"
              required
            />
            
          </div>

          {/* Email Field */}
          <div className="form-field">
            
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="field-input"
              placeholder="Enter your email"
              required
            />
           
          </div>

          {/* Password Field */}
          <div className="form-field">
           
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field-input"
              placeholder="Create a password"
              required
              minLength={6}
            />
           
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!name.trim() || !email.trim() || !password.trim() || isLoading}
            className={`submit-btn ${isLoading ? 'loading' : ''}`}
          >
            {isLoading ? (
              <span className="loading-content">
                <span className="spinner"></span>
                <span>Creating Account...</span>
              </span>
            ) : (
              <>
                <span> Get Started</span>
                <span className="btn-arrow">→</span>
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-white/70 mt-6 text-sm">
          By continuing, you agree to swipe right for delicious food! 😋
        </p>
      </div>

      {/* Decorative Elements */}
      <div className="decoration decoration-1"></div>
      <div className="decoration decoration-2"></div>
    </div>
  );
}

