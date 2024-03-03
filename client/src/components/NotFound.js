// src/components/NotFound.js, JN, 05.02.2024
import React from "react";
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return <h1>{t('notFound')}</h1>;
};

export default NotFound;


// eof
