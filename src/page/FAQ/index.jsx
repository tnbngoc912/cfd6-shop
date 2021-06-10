import React, { useEffect, useState } from "react";
import faqApi from "../../service/faqApi";
import FAQGroup from "./components/FAQGroup";
import { useTranslate } from "../../core/Translate";

export default function FAQ() {
  let { t } = useTranslate();
  let [list, setList] = useState([]);

  useEffect(() => {
    faqApi.get().then(res => {
      setList(res);
    });
  }, []);

  return (
    <section className="pt-7 pb-12">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            {/* Heading */}
            <h3 className="mb-10 text-center">
              {t("Frequently Asked Questionss")}
            </h3>
            {/* Heading */}
            {list.map((e, i) => (
              <FAQGroup key={i} {...e} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
