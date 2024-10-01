interface Props {
  className: string;
  icon?: React.ReactNode;
  h1_text: string;
  p_text?: string;
  children?: React.ReactNode;
}

export const FullScreen = (props: Props) => {
  return (
    <div className={`bg-slate-50 ${props.className}`}>
      <div className="flex flex-col h-[100dvh]">
        <div className="m-auto">
          <div className="block text-center space-y-4 max-w-2xl">
            {props.icon}
            <h1 className="font-medium text-lg text-blackish">
              {props.h1_text}
            </h1>
            {props.p_text && (
              <p className="text-sm text-blackish">{props.p_text}</p>
            )}
            {props.children && <>{props.children}</>}
          </div>
        </div>
      </div>
    </div>
  );
};
