// src/components/OrcidIcon.jsx

import Image from "next/image";

const OrcidIcon = ({ size = 16 }) => (
  <Image
    src="/icons/ORCID-iD_icon_vector.svg"
    alt="ORCiD icon"
    width={size}
    height={size}
    className="inline-block"
  />
);

export default OrcidIcon;
