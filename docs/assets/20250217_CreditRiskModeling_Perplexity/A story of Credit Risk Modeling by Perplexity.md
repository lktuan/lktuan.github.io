<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

# Now combine your 2 previous answers and tell me a story about credit risk modeling

Portfolio analysis -> need for scoring (A, B, C score) -> model development -> model validation -> deployment and monitoring -> IFRS9, CECL, LEL, Basel

Each part tell me the key points to memorize
---
Here's a story illustrating the credit risk modeling process, integrating portfolio analysis, scoring models, development, validation, deployment, monitoring, and regulatory frameworks:

Once upon a time, in the bustling city of Financia, there lived a diligent credit risk manager named Alice. Alice worked for a prominent lending institution, "Trustworthy Loans Inc.," which prided itself on making sound financial decisions.

**Portfolio Analysis: The Beginning**

Alice began her day by reviewing Trustworthy Loans Inc.'s loan portfolio.
*Key Points to Memorize:* **Portfolio analysis is essential for understanding the overall risk exposure of a lending institution[^1][^2]. It involves analyzing various segments of the portfolio to identify trends, concentrations, and potential vulnerabilities.**

* **Vintage Analysis**: Alice examined loan performance based on origination periods.
*Key Points to Memorize:* **Vintage analysis tracks loan performance by origination period to identify trends and potential issues with specific loan cohorts.**
* **Roll Rate Analysis**: She studied how accounts transitioned between delinquency statuses.
*Key Points to Memorize:* **Roll rate analysis monitors the movement of accounts between delinquency stages to assess the likelihood of accounts becoming more delinquent.**
* **Variance Analysis**: Alice assessed the variability in credit losses across different portfolio segments.
*Key Points to Memorize:* **Variance analysis evaluates the variability in credit losses across different portfolio segments to identify high-risk areas.**

Alice noticed an increase in delinquencies among recent loan vintages, particularly in the unsecured personal loan segment. It became clear they needed more robust methods to differentiate good borrowers from potentially bad ones.

**The Need for Scoring Models (Application, Behavioral, Collection)**

Recognizing the limitations of their existing risk assessment methods, Alice spearheaded the development of advanced credit scoring models.
*Key Points to Memorize:* **Credit scoring models are used to assess the creditworthiness of applicants and existing borrowers, aiding in decision-making related to loan approvals, credit limits, and collections[^4][^6].**

* **Application Score**: This model aimed to predict the creditworthiness of new loan applicants.
*Key Points to Memorize:* **Application scores evaluate new applicants based on credit history, income, and other relevant factors.**
* **Behavioral Score**: This model focused on existing customers, using transaction behavior and payment history to predict future performance.
*Key Points to Memorize:* **Behavioral scores assess the creditworthiness of existing customers based on their account activity and payment patterns.**
* **Collection Score**: This model was designed to prioritize and optimize debt collection efforts by predicting the likelihood of recovering debts from delinquent accounts.
*Key Points to Memorize:* **Collection scores predict the likelihood of recovering debts from delinquent accounts to optimize collection strategies.**

**Model Development: Building the Predictive Power**

Alice and her team delved into model development, employing various techniques.
*Key Points to Memorize:* **Model development involves selecting appropriate algorithms, identifying relevant input variables, and training the model using historical data[^4].**

* They used **Weight of Evidence (WOE)** transformation to convert categorical variables into a continuous format.
*Key Points to Memorize:* **WOE transformation converts categorical variables into a continuous format that reflects their predictive power.**
* **Logistic Regression**: They employed traditional logistic regression for its interpretability.
*Key Points to Memorize:* **Logistic regression is a statistical method used for binary classification problems, providing probabilities of default.**
* **Ensemble Methods**: They explored advanced ensemble methods to improve predictive accuracy.
    * **Random Forest**: Multiple decision trees.
*Key Points to Memorize:* **Random Forest combines multiple decision trees to improve predictive accuracy and handle non-linear relationships.**
    * **Gradient Boosting (XGBoost, LightGBM)**: Sequentially building trees.
*Key Points to Memorize:* **Gradient Boosting methods like XGBoost and LightGBM build trees sequentially to correct errors made by previous trees, optimizing for speed and performance.**
    * They used Python libraries like `statsmodels`, `optbinning`, `lightGBM`, and `XGBoost`.

**Model Validation: Ensuring Accuracy and Reliability**

Once the models were developed, Alice rigorously validated them.
*Key Points to Memorize:* **Model validation ensures the accuracy, stability, and reliability of credit risk models[^4].**

* **GINI Coefficient**: Measures discriminatory power.
*Key Points to Memorize:* **GINI coefficient measures the model's ability to discriminate between defaulters and non-defaulters.**
* **ROC Curve and AUC**: Assesses the trade-off between true positive and false positive rates.
*Key Points to Memorize:* **ROC curves and AUC quantify the model's ability to distinguish between defaulters and non-defaulters across various threshold settings.**
* **KS Test**: Assesses the separation between distributions of good and bad borrowers.
*Key Points to Memorize:* **KS test measures the maximum distance between the cumulative distribution functions of good and bad borrowers to assess model separation.**

The models showed strong validation results, confirming their effectiveness in predicting credit risk.

**Deployment and Monitoring: Keeping a Watchful Eye**

With validated models in hand, Trustworthy Loans Inc. integrated them into their decision-making processes.
*Key Points to Memorize:* **Model deployment involves integrating the validated models into the institution's operational systems, while monitoring ensures ongoing performance and stability.**

* They developed dashboards to monitor key performance indicators (KPIs) such as delinquency rates, default rates, and portfolio composition.
*Key Points to Memorize:* **Monitoring tools track KPIs, generate reports, and provide alerts to ensure the portfolio's health and model performance.**

**Regulatory Compliance: Navigating the Rules**

Alice ensured that Trustworthy Loans Inc.'s credit risk practices aligned with regulatory requirements.
*Key Points to Memorize:* **Regulatory compliance involves adhering to standards and guidelines set by regulatory bodies to ensure sound risk management practices[^5].**

* **IFRS 9 (International Financial Reporting Standard)**: Focuses on forward-looking expected credit loss (ECL) models.
*Key Points to Memorize:* **IFRS 9 requires financial institutions to estimate expected credit losses over the life of a financial instrument.**
* **CECL (Current Expected Credit Loss)**: U.S. standard requiring institutions to estimate expected losses over the life of a loan at origination.
*Key Points to Memorize:* **CECL mandates estimating expected losses over the entire life of a loan at origination, promoting a proactive approach.**
* **Basel Accords**: Framework for banking regulation focusing on capital adequacy.
*Key Points to Memorize:* **Basel Accords set standards for capital adequacy, risk management, and supervision to ensure the stability of the banking system.**

Thanks to Alice's expertise and dedication, Trustworthy Loans Inc. thrived, maintaining a healthy loan portfolio and making informed lending decisions. The end.

<div style="text-align: center">⁂</div>

[^1]: https://www.newyorkfed.org/medialibrary/media/research/epr/98v04n3/9810wils.pdf

[^2]: https://www.mckinsey.com/capabilities/risk-and-resilience/our-insights/the-evolving-role-of-credit-portfolio-management

[^3]: https://octus.com/products/portfolio-analytics/

[^4]: https://analystprep.com/study-notes/frm/credit-scoring-and-retail-credit-risk-management/

[^5]: https://www.pwc.com/gx/en/audit-services/ifrs/publications/ifrs-9/ifrs-9-impairment-significant-increase-in-credit-risk.pdf

[^6]: https://www.bajajfinserv.in/credit-scoring-models

[^7]: https://support.sas.com/resources/papers/proceedings19/3554-2019.pdf

[^8]: https://github.com/NeonOstrich/Credit-Risk-Classification-using-Logistic-Regression

[^9]: https://fastercapital.com/topics/ensemble-methods-for-credit-risk-assessment.html

[^10]: https://www.moodys.com/web/en/us/insights/resources/overview-of-modeling-credit-portfolios.pdf

[^11]: https://iacpm.org/wp-content/uploads/2023/11/IACPM-Research-Principles-and-Practices-in-CPM-2023-White-Paper.pdf

[^12]: https://www.msci.com/our-solutions/analytics/credit-risk-analytics

[^13]: https://www.mathworks.com/discovery/credit-scoring-model.html

[^14]: https://www.bb.org.bd/mediaroom/circulars/brpd/dec1105brpd18enl.pdf

[^15]: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4624501

[^16]: https://www.aporia.com/learn/machine-learning-for-business/credit-risk-modeling-importance-model-types-and-10-best-practices/

[^17]: https://repository.up.ac.za/bitstream/handle/2263/30363/01thesis.pdf?sequence=2\&isAllowed=y

[^18]: https://www.pwc.com.tr/en/assets/about/svcs/abas/frm/creditrisk/publications/pwc_activeportfoliocreditriskmanagement.pdf

[^19]: https://www.lendapi.com/documentation/ai-ml-credit-risk-scoring

[^20]: https://fiinratings.vn/upload/docs/credit-risk-assessment-sample.pdf

[^21]: https://www.crif.in/products-and-services/predictive-analytics-scorecards

[^22]: https://www.ecb.europa.eu/pub/pdf/scpops/ecbocp64.pdf

[^23]: https://timespro.com/blog/credit-risk-management-from-assessing-risk-to-managing-portfolios

[^24]: https://biplus.com.vn/blog/credit-risk-management-software

[^25]: https://www.ncino.com/news/importance-credit-risk-management-financial-institutions

[^26]: https://www.moodys.com/web/en/us/solutions/portfolio-management/credit-portfolio-management.html

[^27]: https://www.sas.com/en_gb/solutions/risk-management/solution/credit-risk-management.html

[^28]: https://fastercapital.com/content/Importance-in-Credit-Risk-Portfolio-Modeling.html

[^29]: https://www.rfilc.org/wp-content/uploads/2020/08/1153752586791_ppt__module_8__1.pdf

[^30]: https://www.linkedin.com/advice/0/what-latest-software-tools-used-credit-risk-10s8f

[^31]: https://www.researchgate.net/publication/221529760_Tutorial_on_Portfolio_Credit_Risk_Management

[^32]: https://www.opensee.io/use-cases/credit-risk

[^33]: https://www.fdic.gov/regulations/examinations/credit_card/pdf_version/ch8.pdf

[^34]: https://riskseal.io/blog/how-to-assess-the-effectiveness-of-credit-scoring-models

[^35]: https://abcfinance.co.uk/credit/

[^36]: https://www.infosysbpm.com/blogs/financial-services/credit-scoring-models.html

[^37]: https://www.sas.com/content/dam/SAS/documents/marketing-whitepapers-ebooks/sas-whitepapers/en/credit-risk-modeling-digital-age-109772.pdf

[^38]: https://sahibnk.com/en/blog_detail/abcs-of-credit-scores-the-comprehensive-guide-to-financial-well-being/

[^39]: https://www.debt.org/credit/report/scoring-models/

[^40]: https://www.investopedia.com/terms/c/credit_scoring.asp

[^41]: https://www.researchgate.net/figure/a-b-c-Comparison-of-CreditRisk1-and-CreditMetrics-models_fig4_282555162

[^42]: https://www.highradius.com/resources/Blog/credit-scoring-models-types-and-examples/

[^43]: https://www.linkedin.com/pulse/abc-credit-global-institute-of-credit-profess-qhpce

[^44]: https://www.listendata.com/2019/08/credit-risk-modelling.html

[^45]: https://www.researchgate.net/publication/324573074_Application_of_Ensemble_Models_in_Credit_Scoring_Models

[^46]: https://www.leewayhertz.com/build-credit-risk-models-using-machine-learning/

[^47]: https://www.ibm.com/docs/en/spss-statistics/saas?topic=regression-using-binary-logistic-assess-credit-risk

[^48]: https://www.kaggle.com/code/enricosain/credit-risk-analysis-using-ensemble-methods

[^49]: https://www.researchgate.net/publication/380465781_Credit_Risk_Analysis_Using_Logistic_Regression_Modeling

[^50]: https://macsphere.mcmaster.ca/handle/11375/28049

[^51]: https://corporatefinanceinstitute.com/resources/commercial-lending/credit-risk-analysis-models/

[^52]: https://www.mathworks.com/help/risk/creditscorecard-compare-logistic-regression-decision-trees.html

[^53]: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4318348

[^54]: https://www.bis.org/publ/bcbs49.pdf

[^55]: https://www.atlantis-press.com/proceedings/msetasse-15/25843616

[^56]: https://www.researchgate.net/publication/363661805_A_Practical_Approach_to_Development_and_Validation_of_Credit_Risk_Models_Based_on_Data_Analysis

[^57]: https://www.linkedin.com/posts/shubhamkotal_metrics-credit-risk-activity-7108745407068803072-D1rk

[^58]: https://assets.kpmg.com/content/dam/kpmg/br/pdf/2018/10/credit-risk-model-validation-solution.pdf

[^59]: https://phamdinhkhanh.github.io/2020/01/17/ScoreCard.html

[^60]: https://arxiv.org/html/2410.13877v1

[^61]: https://www.linkedin.com/pulse/understanding-interpreting-metrics-credit-scoring-santhanam-iyengar-mvfmc

[^62]: https://www.linkedin.com/pulse/credit-risk-model-validation-darshika-srivastava-arwpc

[^63]: https://datascience.stackexchange.com/questions/2523/relationship-between-ks-auroc-and-gini

[^64]: https://www.finalyse.com/finalyse-credit-risk-model-validation-suite

[^65]: https://ma.moodys.com/rs/961-KCJ-308/images/2019-02-26-Model-Validation.pdf

[^66]: https://www.nibmindia.org/staticfile/pdf/IBFR 2022 [Ch.7 - Model Risk Management in Credit Risk Models_ Tasneem Chherawala].pdf

[^67]: https://www.begbies-traynorgroup.com/articles/finance/understanding-the-importance-of-credit-risk-monitoring

[^68]: https://www.experian.com/blogs/insights/machine-learning-model-deployment/

[^69]: https://www.actico.com/solutions/credit-risk-platform/

[^70]: https://www.bankingsupervision.europa.eu/activities/internal_models/omm/html/index.en.html

[^71]: https://github.com/JakobLS/mlops-credit-risk

[^72]: https://ginimachine.com/blog/5-the-best-credit-risk-management-tools-to-use-in-2023/

[^73]: https://www.finalyse.com/credit-risk-modelling

[^74]: https://www.eself.ai/blog/top-credit-risk-management-tools-in-banks-for-smarter-decision-making/

[^75]: https://bleu-azur-consulting.eu/wp-content/uploads/2018/06/click-here-to-access-moodys-detailed-report.pdf

[^76]: https://www.elibrary.imf.org/view/journals/001/2020/111/article-A001-en.xml

[^77]: https://rulebook.centralbank.ae/en/rulebook/article-3-credit-risk-management-framework-0

[^78]: https://assets.kpmg.com/content/dam/kpmg/pdf/2016/06/cecl-ifrs9-coe-final-062016.pdf

[^79]: https://www.researchgate.net/publication/342372733_Credit_risk_management_in_bank_Impacts_of_IFRS_9_and_Basel_3

[^80]: https://www.gdslink.com/how-to-build-a-credit-risk-management-framework/

[^81]: https://www.bis.org/bcbs/publ/d386.pdf

[^82]: https://www.bartbaesens.com/course/8/credit-risk-modeling-for-basel-and-ifrs-9-using-r-and-python

[^83]: https://www.bankofengland.co.uk/-/media/boe/files/ccbs/resources/modelling-credit-risk

[^84]: https://www2.deloitte.com/content/dam/Deloitte/us/Documents/finance/us-advisory-ifrs-9-pov.pdf

[^85]: https://www.worldscientific.com/doi/pdf/10.1142/S2424786324410020?download=true

[^86]: https://www.researchgate.net/publication/383941877_Credit_Risk_Modeling_with_Big_Data_Analytics_Regulatory_Compliance_and_Data_Analytics_in_Credit_Risk_Modeling

[^87]: https://www.kennesaw.edu/ccse/academics/data-science-analytics/docs/logistic-regression-for-the-classification-of-credit-risk.pdf

[^88]: https://www.worldscientific.com/doi/10.1142/S0218126624501299

[^89]: https://roopya.money/implementing-credit-risk-modelling-strategy/

[^90]: https://pmc.ncbi.nlm.nih.gov/articles/PMC9041570/

[^91]: https://fastercapital.com/content/What-is-Credit-Risk-Model-Validation.html

[^92]: https://www.bis.org/ifc/events/ws_micro_macro/nehrebecka_paper.pdf

[^93]: https://www.rug.nl/staff/j.o.mierau/medema.pdf

[^94]: https://roopya.money/credit-risk-model-validation/

[^95]: https://towardsdatascience.com/evaluating-classification-models-with-kolmogorov-smirnov-ks-test-e211025f5573/

[^96]: https://www.linkedin.com/pulse/validating-new-generation-credit-risk-models-denis-burakov

[^97]: https://ginimachine.com/academia-post/ml-model-performance-evaluation/

[^98]: https://fastercapital.com/topics/model-deployment-and-monitoring-in-credit-risk-prediction.html

[^99]: https://www.aporia.com/learn/machine-learning-for-business/credit-risk-monitoring-the-basics-and-aiml-techniques/

[^100]: https://www.nected.ai/blog/credit-risk-assessment

[^101]: https://lockstep.io/blog/tools-for-credit-risk-management/

[^102]: https://www.youtube.com/watch?v=99D7YpvEwdo

[^103]: https://www.sas.com/content/dam/SAS/documents/marketing-whitepapers-ebooks/sas-whitepapers/en/future-of-risk-modeling-110871.pdf

[^104]: https://www.creditriskmonitor.com

[^105]: https://www.riksbank.se/globalassets/media/rapporter/ekonomiska-kommentarer/engelska/2018/ifrs-9--the-new-accounting-standard-for-credit-loss-recognition.pdf

[^106]: https://www.garp.org/hubfs/Whitepapers/a1Z1W0000054wxHUAQ.pdf

[^107]: https://www.bis.org/bcbs/publ/d385.pdf

[^108]: https://www.newyorkfed.org/medialibrary/media/research/epr/01v07n1/0103hirt.pdf

[^109]: https://www.bis.org/fsi/fsisummaries/ifrs9.pdf

[^110]: https://www.ecb.europa.eu/pub/pdf/scpwps/ecb.wp2841~0ef6dff757.en.pdf

[^111]: https://rulebook.centralbank.ae/en/rulebook/article-3-credit-risk-management-framework
