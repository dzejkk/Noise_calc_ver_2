import styles from "./Heading.module.css";

export default function Heading() {
  return (
    <>
      <div className={styles.headingContianer}>
        <h2>Noise calculator</h2>
        <h1>Work Noise Calculator</h1>
        <p className={styles.headingContianerParagraph}>
          This calculator can help you to evaluate work noise risk factor to
          prevent health of your employyes with ease
        </p>
      </div>
    </>
  );
}
