interface MessageProps {
  children: string;
}

const Message = ({ children }: MessageProps): JSX.Element => {
  return (
    <div
      className={
        "w-full flex justify-center text-sm text-center  text-brandGray " +
        "xs:text-base"
      }
    >
      <p>{children}</p>
    </div>
  );
};

export default Message;
