import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const QUESTIONS = [
  {
    id: "goals",
    title: "How clear are you about what you want to achieve?",
    options: [
      "I am still figuring it out",
      "I have a few ideas",
      "I know my main priorities",
      "I have clear goals",
      "I have clear, well-defined goals",
    ],
  },
  {
    id: "consistency",
    title: "How consistently do you take action toward your goals?",
    options: [
      "Almost never",
      "Occasionally",
      "Sometimes",
      "Most of the time",
      "Very consistently",
    ],
  },
  {
    id: "finances",
    title: "How confident do you feel about your relationship with money?",
    options: [
      "Not confident yet",
      "Slightly confident",
      "Moderately confident",
      "Very confident",
      "Completely confident",
    ],
  },
  {
    id: "nextStep",
    title: "How clear is your next step toward the change you want?",
    options: [
      "I have no idea where to begin",
      "I have a few possible steps",
      "I have a general direction",
      "I know what I need to do",
      "I know my next step and have a plan",
    ],
  },
  {
    id: "confidence",
    title: "How confident are you about following through on your plans?",
    options: [
      "I need a lot of support",
      "I am building my confidence",
      "I feel somewhat confident",
      "I feel confident",
      "I feel very confident",
    ],
  },
];

function getResult(score) {
  if (score <= 11) {
    return {
      title: "Finding Clarity",
      description:
        "This may be a good time to pause, reflect on what matters most, and identify one manageable next step.",
    };
  }

  if (score <= 18) {
    return {
      title: "Building Consistency",
      description:
        "You may already have some direction. Focus on building routines and making your next steps realistic and repeatable.",
    };
  }

  return {
    title: "Ready for Action",
    description:
      "You may have a useful foundation to build on. Choose a priority and turn it into a clear, practical action plan.",
  };
}

export default function Survey() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState("");
  const [includeEmail, setIncludeEmail] = useState(false);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const current = QUESTIONS[step];
  const isLast = step === QUESTIONS.length - 1;

  function chooseAnswer(value) {
    setAnswers((previous) => ({
      ...previous,
      [current.id]: value,
    }));
  }

  async function submitSurvey(event) {
    event.preventDefault();
    setError("");
    setStatus("submitting");

    try {
      const response = await fetch(`${API_URL}/api/survey`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          email: includeEmail ? email.trim() : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not submit the survey.");
      }

      setResult(getResult(data.score));
      setStatus("success");
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  }

  if (status === "success" && result) {
    return (
      <main className="min-h-[65vh] bg-[#f7f4ee] px-5 py-12 sm:py-20">
        <section className="mx-auto max-w-xl rounded-[20px] bg-white p-7 sm:p-10">
          <CheckCircle2 className="text-[#788f69]" size={38} />

          <p className="mt-6 text-xs uppercase tracking-widest text-[#78816d]">
            Your survey results
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            {result.title}
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#74736c]">
            {result.description}
          </p>

          <p className="mt-4 text-xs leading-6 text-[#88857d]">
            This result is a reflection prompt based on your answers, not a
            professional assessment or a guarantee of future outcomes.
          </p>

          <Link
            to="/about"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#c69b55] px-5 py-3 text-sm text-white hover:bg-[#ad8241]"
          >
            Get to Know Me <ArrowRight size={16} />
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-[65vh] bg-[#f7f4ee] px-5 py-12 sm:py-20">
      <section className="mx-auto max-w-2xl rounded-[20px] bg-white p-6 shadow-sm sm:p-10">
        <Link
          to="/resources"
          className="inline-flex items-center gap-2 text-sm text-[#74736c]"
        >
          <ArrowLeft size={15} /> Resources
        </Link>

        <p className="mt-8 text-xs font-medium uppercase tracking-widest text-[#78816d]">
          Purposeful Action Survey
        </p>

        <div
          className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#eee9df]"
          aria-label={`Question ${step + 1} of ${QUESTIONS.length}`}
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={QUESTIONS.length}
          aria-valuenow={step + 1}
        >
          <div
            className="h-full rounded-full bg-[#c69b55] transition-all duration-300"
            style={{
              width: `${((step + 1) / QUESTIONS.length) * 100}%`,
            }}
          />
        </div>

        <p className="mt-4 text-xs text-[#88857d]">
          Question {step + 1} of {QUESTIONS.length}
        </p>

        <form
          className="mt-5"
          onSubmit={(event) => {
            if (!isLast) {
              event.preventDefault();
              setStep((previous) => previous + 1);
              return;
            }

            submitSurvey(event);
          }}
        >
          <fieldset>
            <legend className="text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
              {current.title}
            </legend>

            <div className="mt-6 space-y-3">
              {current.options.map((option, index) => {
                const value = index + 1;
                const selected = answers[current.id] === value;

                return (
                  <label
                    key={option}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm leading-6 transition ${
                      selected
                        ? "border-[#c69b55] bg-[#c69b55]/10"
                        : "border-[#e8e3d9] hover:border-[#c9b18a]"
                    }`}
                  >
                    <input
                      type="radio"
                      name={current.id}
                      value={value}
                      checked={selected}
                      onChange={() => chooseAnswer(value)}
                      className="mt-1 accent-[#c69b55]"
                    />
                    <span>{option}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {isLast && (
            <div className="mt-7 border-t border-[#eee9df] pt-5">
              <label className="flex items-start gap-3 text-sm leading-6">
                <input
                  type="checkbox"
                  checked={includeEmail}
                  onChange={(event) => setIncludeEmail(event.target.checked)}
                  className="mt-1 accent-[#c69b55]"
                />
                <span>
                  Include my email with my survey submission (optional).
                </span>
              </label>

              {includeEmail && (
                <input
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="mt-4 w-full rounded-xl border border-[#e8e3d9] px-4 py-3 text-sm outline-none focus:border-[#c69b55]"
                />
              )}

              <p className="mt-3 text-xs leading-5 text-[#88857d]">
                Your answers will be stored to provide your results and help the
                coach understand survey responses. Add the client's approved
                privacy notice before launching.
              </p>
            </div>
          )}

          {error && (
            <p role="alert" className="mt-4 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="mt-7 flex items-center justify-between gap-3">
            <button
              type="button"
              disabled={step === 0 || status === "submitting"}
              onClick={() => setStep((previous) => previous - 1)}
              className="rounded-full border border-[#e8e3d9] px-5 py-3 text-sm disabled:opacity-40"
            >
              Previous
            </button>

            <button
              type="submit"
              disabled={!answers[current.id] || status === "submitting"}
              className="inline-flex items-center gap-2 rounded-full bg-[#c69b55] px-5 py-3 text-sm font-medium text-white hover:bg-[#ad8241] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "submitting"
                ? "Submitting..."
                : isLast
                  ? "See My Results"
                  : "Next Question"}
              {!isLast && <ArrowRight size={15} />}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
