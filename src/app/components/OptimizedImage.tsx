import { useState } from "react";
import placeholder from "../../assets/teams/team-gallery-placeholder.svg";

type OptimizedImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  critical?: boolean;
};

export default function OptimizedImage({ critical = false, onError, ...props }: OptimizedImageProps) {
  const [failed, setFailed] = useState(false);
  return (
    <img
      {...props}
      src={failed ? placeholder : props.src}
      loading={critical ? "eager" : props.loading ?? "lazy"}
      decoding={props.decoding ?? "async"}
      fetchPriority={critical ? "high" : props.fetchPriority}
      onError={(event) => {
        if (!failed) setFailed(true);
        onError?.(event);
      }}
    />
  );
}
