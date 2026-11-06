import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

function BookingModal({ open, onClose }) {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  function close() {
    onClose();
    setTimeout(() => {
      setSent(false);
      setError("");
    }, 200);
  }
  function submit(e) {
    e.preventDefault();
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter your name and a valid email address.");
      return;
    }
    setError("");
    setSent(true);
  }
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <motion.div
            className="booking-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
          >
            <button
              className="modal-close"
              onClick={close}
              aria-label="Close booking form"
            >
              <X size={19} />
            </button>
            {sent ? (
              <>
                <p className="eyebrow">THANK YOU</p>
                <h2 id="booking-title">You're one step closer.</h2>
                <p className="modal-copy">
                  Thanks, {name.split(" ")[0]}. This demo form is ready to be
                  connected to the company's booking or email service.
                </p>
                <button className="gold-button" onClick={close}>
                  Back to home <ArrowRight size={15} />
                </button>
              </>
            ) : (
              <>
                <p className="eyebrow">LET'S CONNECT</p>
                <h2 id="booking-title">Book a discovery call</h2>
                <p className="modal-copy">
                  Share your details and take the first step toward a more
                  intentional next chapter.
                </p>
                <form onSubmit={submit} className="booking-form">
                  <label>
                    Your name
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      required
                      placeholder="Your full name"
                    />
                  </label>
                  <label>
                    Email address
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                      placeholder="you@example.com"
                    />
                  </label>
                  {error && (
                    <p className="form-error" role="alert">
                      {error}
                    </p>
                  )}
                  <button className="gold-button" type="submit">
                    Request a discovery call <ArrowRight size={15} />
                  </button>
                  <p className="form-note">
                    Demo interaction — booking integration will be added before
                    launch.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default BookingModal;
