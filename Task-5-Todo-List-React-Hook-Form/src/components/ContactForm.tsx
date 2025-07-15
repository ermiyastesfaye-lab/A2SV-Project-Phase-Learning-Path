import { SubmitHandler, useForm } from "react-hook-form";
import "./ContactForm.css";
import FormInput from "./FormInput";
import { FaSpinner } from "react-icons/fa";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<FormData>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
    reset();
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Get in touch</h2>
        <p>We'd love to hear from you! Send us a message.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          id="name"
          label="Your Name"
          type="text"
          placeholder="John Doe"
          register={register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          })}
          error={errors.name}
        />

        <FormInput
          id="email"
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          register={register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email",
            },
          })}
          error={errors.email}
        />

        <FormInput
          id="message"
          label="Your Message"
          textarea
          rows={5}
          placeholder="How can we help you?"
          register={register("message", {
            required: "Message is required",
            minLength: {
              value: 20,
              message: "Message must be at least 20 characters",
            },
            maxLength: {
              value: 500,
              message: "Message must be less than 500 characters",
            },
          })}
          error={errors.message}
        />

        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className={isSubmitting ? "submitting" : ""}
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="spinner" size={20} />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
