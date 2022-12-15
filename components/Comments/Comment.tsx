// ! currently dev

export default function Comment({ key, when, comment }) {
  return (
    <div id={key}>
      <p>{new Date(when).toDateString()}</p>
      <p>{comment}</p>
    </div>
  );
}
