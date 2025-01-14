# Deep Credit Risk: Machine Learning with Python - A Comprehensive Summary

This document provides a detailed summary of the book "Deep Credit Risk: Machine Learning with Python," covering key concepts, formulas, and practical implementations. It aims to serve as a comprehensive guide for credit risk analysts and practitioners.

## Part I: Principles of Data Learning

### 1. Deep Dive

This section introduces the practical aspects of machine learning in credit risk, emphasizing the importance of hands-on experience and real-world data.

**Key Objectives in Credit Risk Analysis using Machine Learning:**

* **Feature Understanding:** Comprehending the role of various financial features, including liquidity, equity, macroeconomic indicators, and borrower characteristics.
* **Prediction:** Building models to predict key credit risk outcomes:
    * **Defaults:**  Probability of Default (PD).
    * **Payoffs:** Probability of Prepayment (PP).
    * **Loss Rates:** Loss Given Default (LGD).
    * **Exposures:** Exposure at Default (EAD).
* **Downturn and Crisis Prediction:**  Developing models to predict downturn and crisis outcomes using pre-crisis data. This is particularly relevant for stress testing and capital planning.
* **Model Interpretation and Validation:**  Understanding model behavior, limitations, and validating results using appropriate techniques.


**Credit Risk Information:**  Commercial banks categorize data based on the stage of the lending process. Understanding the source and nature of these datasets is crucial for feature engineering and model building:

* **Origination/Underwriting Data:**  Data collected during loan application and approval, including borrower demographics, credit history, loan terms, and collateral information.
* **Performance Data:** Ongoing loan performance data collected typically at monthly, quarterly, or annual intervals. This data includes payment history, outstanding balances, and delinquencies.
* **Modification Data:** Data related to loan modifications, such as changes in interest rates, loan terms, or payment schedules.
* **Payoff/Retention Data:** Loan payoff information, including full prepayments, partial prepayments, and loan refinancing details.
* **Maturity Data:** Data related to loan maturity, often including administrative matters such as release of collateral and accounting activities.
* **Default/Workout Data:** Data collected during the default and resolution processes. This includes recovery cash flows, workout expenses, and the time taken for resolution.

**External Data:** Supplementing internal bank data with external sources can significantly improve model accuracy and capture broader economic trends:

* **Macroeconomic Information:** Time-varying economic data, such as GDP growth rates, unemployment rates, inflation, interest rates, and housing market indices. These factors can significantly influence borrower behavior and default rates.
* **Population Statistics:** Demographic data, such as population growth, age distribution, income levels, and geographic location.
* **Other Data Sources:** A wide range of alternative data sources can be incorporated, including:
    * **Business Filings:**  Information on company performance and financial health.
    * **Social Media Data:**  Sentiment analysis and online behavior can provide insights into borrower characteristics.
    * **Expert Ratings:** Credit ratings from agencies like Moody's, S&P, and Fitch.
    * **Property Appraisals:**  Information on collateral value.
    * **Geolocation Data:**  Information on property location and neighborhood characteristics.


**Loan-to-Value Ratio (LTV):** A critical metric in mortgage lending, representing the ratio of the loan amount to the appraised value of the property:

* **LTV_time:** LTV at the observation time, reflecting changes in both loan balance and property value.
* **LTV_orig_time:** LTV at the origination time, representing the initial risk assessment at loan inception.

**LTV Calculation:**

```
LTV_time = balance_time / house_price_at_time
house_price_at_time = house_price_at_origination * (hpi_time / hpi_orig_time)
house_price_at_origination = balance_orig_time / LTV_orig_time
```

where:

* `balance_time`: Outstanding loan balance at observation time.
* `house_price_at_time`: Estimated house price at observation time.
* `house_price_at_origination`: Estimated house price at loan origination.
* `hpi_time`: House price index at observation time.
* `hpi_orig_time`: House price index at loan origination.
* `balance_orig_time`:  Original loan balance.
* `LTV_orig_time`: LTV ratio at origination.


### 2. Python Literacy

This chapter focuses on equipping readers with the necessary Python skills for credit risk analysis.

**Key Packages:**

* **pandas:** Data structures (Series, DataFrames), data manipulation, analysis, and cleaning.  Essential for working with tabular data, handling missing values, and performing data transformations.
* **numpy:**  N-dimensional arrays, mathematical functions, linear algebra, and random number generation. Provides the foundation for numerical computations in Python.
* **scipy:** Statistical functions, optimization algorithms, signal processing, and more. Extends the capabilities of `numpy` with advanced scientific computing tools.
* **matplotlib:** Plotting and visualization library.  Creating static, interactive, and animated visualizations in Python. Crucial for exploratory data analysis and communicating results.
* **scikit-learn:** Machine learning algorithms, model selection, evaluation, and preprocessing.  A comprehensive library for building and evaluating machine learning models.
* **statsmodels:** Statistical modeling, hypothesis testing, and econometrics. Offers a wider range of statistical models and tools compared to `scikit-learn`.


**Data Subsetting and Manipulation:** `pandas` provides powerful tools for slicing, dicing, and manipulating DataFrames:

* `.loc[]`: Label-based indexing. Accessing rows and columns by their labels (e.g., column names).
* `.iloc[]`: Integer-based indexing. Accessing rows and columns by their integer positions.
* `.query()`: Filtering based on conditions.  A convenient way to select rows based on Boolean expressions.
* `.sample()`: Random sampling.  Drawing random samples from a DataFrame, useful for creating training and testing sets.
* `.drop()`: Dropping rows or columns.  Removing unwanted data from a DataFrame.
* `.groupby()`: Grouping data based on values in one or more columns.  Essential for summarizing and aggregating data.
* `.sort_values()`: Sorting data by one or more columns.
* `.fillna()`: Filling missing values.
* `.replace()`: Replacing specific values.
* `.apply()`: Applying a function to each element, row, or column.
* `.transform()`: Transforming data within groups.
* `.astype()`: Converting data types.
* `.clip()`:  Capping and flooring values (winsorizing).


**Data Combining:**  Combining data from multiple sources is often necessary in credit risk analysis:

* `.concat()`: Concatenating DataFrames. Combining DataFrames along rows or columns.
* `.append()`: Appending rows. Adding rows from one DataFrame to another.
* `.merge()`: Joining DataFrames based on columns.  Similar to SQL joins, allowing for flexible data integration.
* `.join()`: Joining DataFrames based on indices.  Combining DataFrames based on their index values.


**Regression Models:**

Basic example of fitting a linear regression using `statsmodels`:

```python
import statsmodels.formula.api as smf

data_ols = smf.ols(formula='LTV_time ~ LTV_orig_time + gdp_time', data=data).fit()
print(data_ols.summary())
```

This code snippet demonstrates how to use the `ols` function from `statsmodels.formula.api` to fit a linear regression model.  The `formula` argument specifies the model equation, and the `data` argument specifies the DataFrame containing the data. The `.fit()` method estimates the model parameters, and the `summary()` method prints a summary of the results.



**numpy vs pandas:**

* `numpy`: Focuses on numerical computation with arrays.  Efficient for numerical operations and mathematical calculations.
* `pandas`:  Provides enhanced data structures (DataFrames) with label-based indexing and extensive functionalities for data analysis and manipulation. More suitable for data cleaning, transformation, and exploration.


**Module `dcr`:**  The book introduces a custom Python module `dcr.py` which contains several credit risk-specific functions. These functions provide convenient tools for performing common credit risk analysis tasks, such as data preparation, feature engineering, model validation, and handling resolution bias (detailed later).


### 3. Risk-Based Learning

This chapter delves into statistical learning techniques commonly used in credit risk, focusing on Maximum Likelihood Estimation (MLE) and Bayesian methods.

**Maximum-Likelihood Estimation (MLE):**  A method for estimating model parameters by finding the parameter values that maximize the likelihood function. The likelihood function represents the probability of observing the data given the model and its parameters.

**Example for Default Modeling (Binomial MLE):** Consider a simple case of estimating the probability of default (PD) π from a sample of n independent loans, where d loans default.  The likelihood function is:


```
L(π) = (n choose d) * π^d * (1 - π)^(n-d)
```

The MLE for π is the sample default rate:


```
π = d / n
```



**MLE for Logistic Regression:**  In logistic regression, the likelihood function is more complex, as the PD is modeled as a function of features. The likelihood function for n observations is:


```
L(β) = Π [πi^di * (1 - πi)^(1-di)]
```


where:


* πi = 1 / (1 + exp(-β'xi))  is the predicted PD for loan i.
* β is the vector of model parameters.
* xi is the vector of features for loan i.
* di is the default indicator for loan i (1 if default, 0 otherwise).



The MLE for β is typically found using numerical optimization algorithms, as there is no closed-form solution.



**Bayesian Approaches:**  In Bayesian learning, model parameters are treated as random variables with prior distributions. These prior distributions represent our initial beliefs about the parameters before observing any data. The observed data is then used to update the prior distribution via Bayes' theorem, resulting in the posterior distribution. The posterior distribution represents our updated beliefs about the parameters after observing the data.



**Bayes' Theorem:**


```
P(θ|D) = [P(D|θ) * P(θ)] / P(D)
```


where:


* θ represents the model parameters.
* D represents the observed data.
* P(θ|D) is the posterior distribution of the parameters given the data.
* P(D|θ) is the likelihood function (probability of observing the data given the parameters).
* P(θ) is the prior distribution of the parameters.
* P(D) is the marginal likelihood (probability of observing the data, regardless of the parameter values).



**Markov-Chain Monte Carlo (MCMC):**  A simulation technique used to approximate posterior distributions in Bayesian learning, particularly when the posterior is complex and cannot be calculated analytically. MCMC methods generate a sequence of random samples from the posterior distribution, which can be used to estimate various properties of the posterior, such as the mean, variance, and credible intervals.



### 4. Machine Learning

This chapter provides a foundation for understanding key machine learning concepts, terminology, cost functions, and optimization techniques.


**Terminology:**  Machine learning uses slightly different terminology compared to traditional statistics. Understanding these terms is important for following the discussions in the book.


| Risk-Based Learning | Machine Learning |
|---|---|
| Estimation | Fitting |
| Independent/Explanatory Variable (X) | Input, Feature |
| Dependent/Response Variable (Y) | Output |
| Random Error | Noise |
| In-Sample | Training Set |
| Out-of-Sample | Test Set |
| Estimate a Model | Learn a Model |
| Model Parameters | Model Weights |
| Regression, Classification | Supervised Learning |
| Clustering, Dimensionality Reduction | Unsupervised Learning |
| Data Point, Observation | Instance, Sample |
| Intercept | Bias |
| Link Function | Activation Function |
| Logistic | Sigmoid |



**Cost/Loss Functions:**  Functions that measure the difference between predicted and observed values.  The goal of machine learning is to find model parameters that minimize the cost function.


* **Mean Squared Error (MSE):**  A common loss function for regression problems, measuring the average squared difference between predicted and observed values.

```
MSE = (1/n) * Σ(yi - ŷi)^2
```


* **Binary Cross-Entropy:** A common loss function for binary classification problems, measuring the average cross-entropy between the predicted probabilities and the observed binary outcomes.  It is closely related to the negative log-likelihood in logistic regression.

```
Binary Cross-Entropy = - (1/n) * Σ [yi*log(πi) + (1 - yi)*log(1 - πi)]
```


* **Categorical Cross-Entropy:** A generalization of binary cross-entropy for multi-class classification problems.



**Information Theory (for Categorical Outputs):** Information theory provides useful concepts for understanding the information content of variables and events, particularly in classification problems.


* **Information:** Measures the amount of surprise associated with an event.  For a default event with probability π, the information is:

```
I(d) = -log2(π)
```

* **Entropy:** Measures the average information content of a random variable. For a binary variable (default/non-default) with probability of default π, the entropy is:

```
H = -πln(π) – (1 – π)ln(1 – π)
```

* **Cross-Entropy:** Measures the average information content when using a predicted probability distribution q to represent a true probability distribution p. For binary classification, the cross-entropy between the predicted PD π and the observed default d is:

```
H* = -dln(π) – (1 – d)ln(1 – π)
```


**Optimization: Gradient Descent:**  An iterative optimization algorithm for finding the minimum of a function.  Gradient descent works by repeatedly updating the model parameters in the direction of the negative gradient of the cost function.


**Gradient Descent Update Rule:**


```
θk+1 = θk - η * ∇J(θk)
```


where:


* θk is the vector of model parameters at iteration k.
* η is the learning rate (controlling the step size).
* ∇J(θk) is the gradient of the cost function J at θk.



**Variants of Gradient Descent:**


* **Stochastic Gradient Descent (SGD):**  Updates parameters based on the gradient computed from a single observation (or a small batch of observations).
* **Mini-Batch Gradient Descent:**  Updates parameters based on the gradient computed from a small batch of observations.
* **Batch Gradient Descent:**  Updates parameters based on the gradient computed from the entire training dataset.
* **Adaptive Gradient Descent Algorithms (e.g., Adam, RMSprop):**  Adapt the learning rate for each parameter based on past gradients.



**Learning and Validation:**


* **Train-Test Split:** Dividing the data into training and testing sets is crucial for evaluating model performance on unseen data. The training set is used to train the model, and the test set is used to evaluate the model's performance on data it has not seen before. This helps to assess the model's ability to generalize to new data.
* **Bias-Variance Tradeoff:**  The bias-variance tradeoff is a fundamental concept in machine learning.  Bias refers to the error introduced by approximating a real-world problem, which may be complex, by a simplified model. Variance refers to the model's sensitivity to fluctuations in the training data.  A model with high bias will underfit the data (i.e., fail to capture the underlying patterns), while a model with high variance will overfit the data (i.e., capture noise in the training data).  The goal is to find a model with low bias and low variance.
* **Cross-Validation:**  A technique for evaluating model performance and tuning hyperparameters. In k-fold cross-validation, the training data is divided into k folds. The model is trained on k-1 folds and evaluated on the remaining fold. This process is repeated k times, with each fold serving as the validation set once. The average performance across the k folds is then used as an estimate of the model's performance. This technique helps to reduce the variance in the performance estimate compared to a single train-test split.
* **Overfitting:**  Occurs when a model learns the training data too well, capturing noise and idiosyncrasies that are not representative of the underlying data generating process. An overfitted model will perform well on the training data but poorly on unseen data.
* **Underfitting:** Occurs when a model is too simple to capture the underlying patterns in the data. An underfitted model will perform poorly on both training and unseen data.
* **Regularization:** A technique for preventing overfitting by adding a penalty term to the cost function. The penalty term discourages the model from learning overly complex relationships in the training data. Common regularization techniques include L1 (LASSO), L2 (Ridge), and Elastic Net regularization.
* **Hyperparameter Tuning:**  Many machine learning models have hyperparameters that control the model's complexity and learning behavior.  Hyperparameter tuning involves finding the optimal hyperparameter values that minimize the model's error on a validation set. Common techniques for hyperparameter tuning include grid search, random search, and Bayesian optimization.


## Part II: Data Processing and Validation (Continued)


### 5. Outcome Engineering (Continued)

**Outcomes in Credit Risk:**


* **Survival (0):**  The loan continues to the next period without default or payoff. This is the most common outcome in most credit portfolios.
* **Default (1):** The borrower fails to meet payment obligations, typically defined by a certain number of days past due (e.g., 90 days).  Default is a key event in credit risk, leading to potential losses for the lender.
* **Payoff (2):**  The borrower fully repays the loan before its scheduled maturity. This can occur through full prepayment, refinancing, or loan sale.
* **Maturity (3):**  The loan reaches its scheduled maturity date, and the remaining balance is fully repaid.


**Cure:** A cure event occurs when a defaulted loan returns to performing status, i.e., the borrower resumes making regular payments.


**Loss Given Default (LGD):**  The percentage of the outstanding loan amount that is lost in the event of default, net of recovery proceeds.  LGD is a crucial parameter in credit risk modeling, representing the severity of losses.


**LGD Calculation:**


```
LGD = (EAD - Σ(CFt / (1 + rt)^t)) / EAD
```


where:


* `EAD`: Exposure at Default (outstanding loan balance at the time of default).
* `CFt`: Workout cash flows received at time t after default.
* `rt`: Discount rate applied to the workout cash flows at time t.
* `t`:  Time period after default.


**Recovery Rate (RR):**  The complement of LGD, representing the percentage of the outstanding loan amount that is recovered in the event of default.


```
RR = 1 - LGD
```



**Exposure Conversion Measures:**  These measures are used to standardize loan exposures, accounting for differences in loan sizes and characteristics.  This is particularly important when modeling portfolio credit risk, as it allows for comparisons across different loans and portfolios.


* **Exposure at Default (EAD):** The outstanding loan amount at the time of default.
* **Credit Conversion Factor (CCF):**  The ratio of the change in exposure to the unused portion of a credit line. Used primarily for credit lines and revolving credit facilities.
* **Credit Equivalent Amount (CEA):**  EAD adjusted for credit risk mitigation techniques (e.g., collateral).
* **Commitment Amount:** The maximum amount that a lender has committed to lend to a borrower.


**Default Engineering:** The process of creating and transforming default-related variables for use in credit risk models.



* **Time-Vintage-Age (TVA) Analysis:**  Analyzing default rates by time, vintage (loan origination time), and age (time since origination).  This helps to understand how default rates evolve over time and identify potential vintage effects (i.e., differences in default rates across loans originated at different times).
* **Multi-Lead Analysis:**  Predicting default over different future time horizons (e.g., 1-year, 2-year). This is important for forecasting losses and assessing the risk profile of a loan over time.
* **Multi-Period Analysis:**  Analyzing cumulative and marginal default rates over multiple periods, often up to the lifetime of a loan. This is essential for IFRS 9 and CECL calculations.


**Cumulative Default Rate:** The probability that a loan will default within a given time horizon, conditional on surviving up to that point.


**Marginal Default Rate:** The probability that a loan will default in a given period, conditional on surviving up to the beginning of that period.



**LGD Engineering:** The process of creating and transforming LGD-related variables for use in credit risk models.


* **Resolution Period:** The time elapsed between the default event and the resolution of the loan, typically when all recovery cash flows have been collected. The resolution period can vary significantly across loans and can have a significant impact on LGD.
* **LGD Discount Rates:**  The discount rate used to discount future recovery cash flows to the present value.  The choice of discount rate can have a substantial impact on LGD estimates.  Common choices include the loan contract rate, the risk-free rate, and the bank's cost of funds.
* **Resolution Bias:** A bias in observed LGDs that arises due to the fact that loans with longer resolution periods tend to have higher LGDs.  This is because more losses are typically realized as the resolution period increases.  Addressing resolution bias is crucial for accurate LGD modeling. Techniques for addressing resolution bias include excluding loans with incomplete workouts, imputing missing LGD values, and using survival models.




### 6. Feature Engineering (Continued)


**Missing Feature Analysis:**  Handling missing values in features is a crucial step in data preparation.  Different approaches can be taken depending on the nature and extent of missingness.


* **Keeping Missing Values:**  If the missingness itself is informative (e.g., missing credit score might indicate a higher risk borrower), creating a separate category or indicator for missing values can be beneficial.
* **Deleting Missing Values (Listwise Deletion):**  Removing observations with missing values on any of the features. This approach is simple but can lead to substantial data loss and potential bias if the missingness is not random.
* **Imputation:** Replacing missing values with estimated values. Common imputation methods include:
    * **Mean/Median/Mode Imputation:** Replacing missing values with the mean, median, or mode of the non-missing values for that feature.
    * **Regression Imputation:**  Predicting missing values using a regression model based on other features.
    * **K-Nearest Neighbors Imputation:**  Imputing missing values based on the values of the k-nearest neighbors in the feature space.
    * **Multiple Imputation:**  Creating multiple imputed datasets and combining the results.


**Feature Outlier Analysis:**  Outliers are extreme values that can distort model estimates and predictions.  Different methods can be used to identify and handle outliers:


* **Keeping Outliers:** In some cases, outliers might represent genuine extreme values and should be retained in the data.
* **Deleting Outliers:** Removing outliers from the dataset.  This is a simple approach but can lead to information loss.
* **Winsorizing:**  Capping and flooring values at certain percles (e.g., 1st and 99th percentiles).  This preserves the information contained in the extreme values while reducing their influence on model estimates.
* **Trimming:** Removing a fixed percentage of the most extreme values from both tails of the distribution.
* **Transformation:** Applying a non-linear transformation (e.g., log transformation) to reduce the impact of outliers.



**Scaling:**  Scaling involves transforming feature values to a specific range. This is often necessary to improve model performance, particularly for distance-based algorithms like K-Nearest Neighbors and Support Vector Machines.


* **Feature Ratios:**  Creating new features by dividing one feature by another.  This can be helpful for capturing relationships between features and reducing the influence of scale. Examples include debt-to-income ratio, loan-to-value ratio, and current ratio.
* **Decimal Scaling:**  Multiplying or dividing a feature by a constant factor (e.g., 10, 100, 1000).  This simply shifts the decimal point and can be useful for features with large values.
* **Min-Max Scaling:**  Scaling features to a specific range (e.g., [0, 1]).  This is done by subtracting the minimum value and dividing by the range (maximum - minimum).

```
x_scaled = (x - min(x)) / (max(x) - min(x))
```

* **Standardization (Z-score Normalization):**  Subtracting the mean and dividing by the standard deviation.  This transforms the feature to have a mean of 0 and a standard deviation of 1.

```
x_scaled = (x - mean(x)) / std(x)
```

* **Normalization (Unit Vector Normalization):** Scaling features to have a unit norm (Euclidean norm of 1). This is typically done by dividing each feature vector by its norm.



**Non-linear Feature Transformations:**  These transformations are used to capture non-linear relationships between features and the outcome variable.



* **Polynomials:**  Adding polynomial terms (e.g., x^2, x^3) to the model.  This allows the model to capture curved relationships between features and the outcome.
* **Splines:**  Piecewise polynomial functions that can model complex non-linear relationships. Splines are defined by a set of knots (breakpoints) and polynomial segments between the knots.
* **Categorization (Binning, Discretization):**  Converting continuous variables into categorical variables by dividing the value range into bins or intervals.  This can be useful for capturing non-linear relationships and for handling outliers.
* **Weight-of-Evidence (WOE):**  A technique for transforming categorical variables based on the log-odds ratio. WOE is often used in credit scoring and can improve model performance by capturing the predictive power of categorical features.  For a category k, the WOE is calculated as:

```
WOEk = ln(%defaultsk / %nondefaultsk)
```


**Feature Reduction:** Techniques for reducing the number of features in the dataset while preserving relevant information.



* **Aggregation:**  Combining multiple features into a single composite score (e.g., credit score). This can simplify the model and improve interpretability.
* **Clustering:**  Grouping similar observations based on their feature values.  The cluster assignments can then be used as a new feature in the model.
* **Principal Component Analysis (PCA):**  A linear dimensionality reduction technique that creates a set of uncorrelated principal components from the original features. The principal components are ordered by the amount of variance they explain, and the first few principal components often capture most of the information contained in the original features.  PCA can reduce model complexity and improve performance by removing redundant information.



### 7. Feature Selection (Continued)


**Economic Feature Selection:**  Selecting features based on economic theory, domain expertise, and business intuition.  This involves understanding the underlying economic drivers of credit risk and selecting features that are expected to be relevant for predicting default or other credit risk outcomes. Examples include:


* **Borrower Features:** Income, wealth, debt levels, employment history, and credit score.
* **Loan Features:** Loan amount, interest rate, loan term, and loan type.
* **Macroeconomic Features:** GDP growth rate, unemployment rate, and interest rates.



**Univariate Feature Selection:**  Evaluating each feature individually based on its statistical relationship with the outcome variable. These methods are computationally efficient but may not capture interactions between features.



* **Means Test (t-test):**  Comparing the means of a feature for different outcome groups (e.g., default vs. non-default). A significant difference in means suggests that the feature is related to the outcome.
* **F-Statistic (ANOVA):**  Testing for differences in variance between outcome groups. Similar to the t-test, but focuses on variance instead of means.
* **Association (Correlation):**  Measuring the linear relationship between a feature and the outcome.  The correlation coefficient measures the strength and direction of the linear relationship.
* **WOE and Information Value (IV):**  The information value (IV) measures the predictive power of a categorical feature.  It is calculated based on the WOE values for each category.  A higher IV indicates a stronger relationship between the feature and the outcome.

**Information Value Calculation:**

```
IV = Σ [( %defaultsk - %nondefaultsk) * WOEk ]
```


**Model-based Feature Selection:**  These methods use a model to assess feature importance. They can capture interactions between features and are generally more powerful than univariate methods, but can also be computationally more expensive.


* **Manual Selection:**  Trying different feature combinations and evaluating model performance on a validation set. This approach is simple but can be time-consuming and may not find the optimal feature subset.
* **In (1) and Out (0) Selection (Feature Importance):**  Training a model (e.g., logistic regression) and selecting features based on their coefficients or other measures of importance (e.g., feature importance scores from tree-based models).
* **Recursive Feature Elimination (RFE):**  Recursively removing features based on their importance in a model.  RFE starts with all features and iteratively removes the least important feature until the desired number of features is reached.
* **Regularization (L1, L2, Elastic Net):**  Adding a penalty term to the cost function to discourage the model from learning overly complex relationships. Regularization can shrink the coefficients of less important features to zero, effectively performing feature selection.  L1 regularization (LASSO) tends to perform feature selection by shrinking some coefficients to exactly zero, while L2 regularization (Ridge) shrinks all coefficients towards zero but rarely to exactly zero.  Elastic Net combines L1 and L2 regularization.





### 8. Validation (Continued)


**Qualitative Validation:**  Qualitative validation involves assessing the model's validity based on non-quantitative factors, such as:


* **Use Tests:**  Ensuring that the model is used appropriately for its intended purpose.
* **Data Quality:**  Verifying that the data used to train and validate the model is accurate, complete, and relevant.
* **Documentation:**  Documenting the model's development, assumptions, limitations, and validation results.
* **Senior Management Approval:** Obtaining senior management approval for the model's use.



**Quantitative Validation:** Quantitative validation involves assessing the model's performance using quantitative metrics. This is essential for ensuring that the model is accurate and reliable.


* **Discrimination:** Measures the model's ability to distinguish between different outcome groups (e.g., default vs. non-default).  Key metrics include:
    * **AUC (Area Under the ROC Curve):**  A measure of the model's ability to rank observations correctly. A higher AUC indicates better discrimination.
    * **Accuracy Ratio (AR) / Gini Coefficient:**  Related to the AUC, providing a similar measure of discriminatory power.
    * **KS Statistic (Kolmogorov-Smirnov Statistic):**  Measures the maximum separation between the cumulative distribution functions of the two outcome groups.



* **Calibration:** Measures how well the model's predicted probabilities align with the observed event rates. Key metrics include:
    * **Brier Score:**  Mean squared error of the predicted probabilities. A lower Brier Score indicates better calibration.
    * **R-squared (Calibration R-squared):** The R-squared from regressing the observed outcomes on the predicted probabilities.
    * **Calibration Curve (Reliability Diagram):**  A plot of observed event rates against predicted probabilities.  A well-calibrated model will have a calibration curve close to the diagonal line.
    * **Hosmer-Lemeshow Test:** A statistical test for assessing calibration.



* **Stability:** Measures the model's consistency over time. Key metrics include:
    * **Population Stability Index (PSI):**  Measures the change in the distribution of predicted probabilities over time.
    * **Characteristic Stability Index (CSI):** Measures the change in the distribution of feature values over time.



**Backtesting:**  A critical aspect of model validation, involving evaluating the model's performance on out-of-time data (data not used for model training or hyperparameter tuning).  This is particularly important for credit risk models, as they are used to predict future events.  Backtesting involves comparing the model's predictions with the actual outcomes that occurred in the out-of-time period.  Key metrics include:


* **AUC (Out-of-Time AUC):**
* **Brier Score (Out-of-Time Brier Score):**
* **Calibration Curve (Out-of-Time Calibration Curve):**



**Other Validation Techniques:**


* **Stress Testing:**  Evaluating the model's performance under stressed economic scenarios.  This helps to assess the model's robustness to adverse conditions.
* **Sensitivity Analysis:**  Assessing the impact of changes in model inputs (features) on model outputs (predictions).




## Part III: Default, Payoff, LGD and EAD Modeling (Continued)


### 9. Default Modeling (Continued)


**Default Indicators:**  A binary variable indicating whether a loan has defaulted in a given period. This is the target variable in default prediction models.


**Default Models:**  Statistical models used to estimate the probability of default (PD).


* **Logistic Regression:**  A widely used model for binary classification problems, including default prediction. The logistic regression model estimates the probability of default as a function of a linear combination of features.  The logistic function maps the linear predictor to a probability between 0 and 1.

```
PD = 1 / (1 + exp(-β'x))
```


* **Probit Regression:**  Similar to logistic regression, but uses the probit function (cumulative standard normal distribution) instead of the logistic function.



**Generalized Linear Models (GLMs):**  A framework for modeling various types of outcomes, including binary outcomes like default. GLMs allow for different link functions (e.g., logistic, probit) to connect the linear predictor to the expected value of the outcome variable.


**Forecasting PDs:**  Using historical data and statistical models to predict future probabilities of default.


* **Training and Test Sample:** Dividing the data into training and testing sets is crucial for evaluating the model's ability to generalize to new, unseen data.
* **Point-in-Time (PIT) PDs:**  PDs that reflect the current economic conditions and are forward-looking.
* **Through-the-Cycle (TTC) PDs:**  PDs that are less sensitive to short-term economic fluctuations and represent a long-run average default rate.



**Crisis PDs:** Estimating PDs under stressed economic scenarios for stress testing and capital planning purposes.


* **Asymptotic Single Risk Factor (ASRF) Model:** A widely used model for estimating portfolio credit risk and calculating regulatory capital requirements.  The ASRF model assumes that the asset returns of borrowers are driven by a single systematic risk factor and idiosyncratic risk factors.

```
Ri = -√ρF + √(1 - ρ)εi
```


where:


* Ri is the asset return of borrower i.
* F is the systematic risk factor.
* ρ is the asset correlation.
* εi is the idiosyncratic risk factor for borrower i.


**Conditional Probability of Default (CPD):**  The probability of default for a borrower given a specific value of the systematic risk factor.


```
CPDi(F) = Φ((ci + √ρF) / √(1 - ρ))
```


where:


* ci is the default threshold for borrower i.
* Φ is the cumulative standard normal distribution.


**Worst-Case PD (WCPD):**  The PD under a stressed scenario, typically corresponding to a low percentile of the systematic risk factor distribution (e.g., 1st percentile).


```
WCPD = Φ((Φ^-1(PD) + √ρΦ^-1(α)) / √(1 - ρ))
```

where α is the confidence level (typically 0.999 for Basel capital calculations).


**Low Default Portfolios:** Special techniques for estimating PDs when default data is scarce, such as in portfolios of sovereign or corporate loans.


* **Most Prudent Estimate (MPE):** A method for estimating PDs under the assumption of monotonicity (PDs increase with risk rating).


### 10. Payoff Modeling (Continued)


**Payoff Indicators:**  A binary variable indicating whether a loan has been prepaid (fully or partially) in a given period.


**Payoff Models:** Similar to default models, payoff models predict the probability of prepayment (PP).


* **Logistic Regression:**
* **Probit Regression:**
* **Multinomial Logit Model:**  This model can be used to simultaneously model default, payoff, and survival. It estimates the probabilities of each outcome as a function of features.

**Selection Control:** Payoff can introduce selection bias into default models, as borrowers who prepay are often systematically different from those who do not.  Addressing this selection bias is crucial for accurate default prediction. Techniques for handling selection bias include:

* **Joint Modeling:**  Simultaneously modeling default and payoff using a multinomial model (e.g., multinomial logit) or a bivariate model.
* **Two-Stage Modeling:**  Modeling payoff in the first stage and including the predicted probability of payoff as a feature in the second-stage default model.


### 11. LGD Modeling (Continued)

**LGD Models:** Statistical models used to estimate Loss Given Default (LGD).

* **Linear Regression:** A simple linear regression model can be used to predict LGD as a function of features. However, linear regression assumes that the errors are normally distributed and that the relationship between the features and LGD is linear. These assumptions may not hold in practice.

```
LGD = β'x + ε
```

* **Transformed Linear Regression:** Applying a transformation (e.g., logit transformation) to the LGD values can improve model performance if the LGD distribution is non-normal or if there are boundary issues (LGD values close to 0 or 1).

```
logit(LGD) = β'x + ε
```

* **Fractional Response Regression:**  This approach models the expected value of LGD directly, addressing the boundary issues of LGD values. It is often based on a quasi-likelihood estimation.

```
E(LGD) = F(β'x)
```

where F(.) is a link function (e.g., logistic function).

* **Beta Regression:** This model assumes that LGD follows a beta distribution, which is naturally bounded between 0 and 1. Beta regression models both the mean and the dispersion of the LGD distribution.

**Forecasting LGDs:**  Similar to PD forecasting, LGD models can be used to predict future LGDs. It is important to consider the time dimension and potential changes in macroeconomic conditions.

### 12. Exposure Modeling (Continued)

**Exposure at Default (EAD):**  The outstanding loan amount at the time of default.  EAD modeling aims to predict the EAD for loans that have not yet defaulted. This is crucial for estimating potential future losses.

**Credit Conversion Measures:**  These measures are used to standardize EADs for different loan types and credit facilities, allowing for comparison and aggregation across different portfolios.

* **Credit Conversion Factor (CCF):** Represents the proportion of undrawn credit that is expected to be drawn at the time of default. Primarily used for credit lines and revolving credit facilities.
* **Credit Equivalent Amount (CEA):**  The EAD adjusted for credit risk mitigation techniques, such as collateralization.
* **Drawdown LGD:** In some cases, institutions might define LGD as the percentage of the maximum exposure (e.g., credit line limit) that is lost in the event of default, rather than the percentage of the outstanding balance at default.


**EAD Modeling Techniques:** Similar techniques as for LGD modeling can be applied to EAD modeling, including linear regression, transformed linear regression, and beta regression.


## Part IV: Machine Learning for PD and LGD Forecasting (Continued)

### 13. Standalone Techniques (Continued)

This chapter explores various standalone machine learning techniques for PD and LGD forecasting.

**K-Nearest Neighbors (KNN):** A non-parametric method that classifies (for PD) or predicts (for LGD) an observation based on the majority class or average value of its k-nearest neighbors in the feature space.  The choice of k (number of neighbors) is a crucial hyperparameter that controls the model's complexity.

**Naive Bayes:** A simple and efficient classification algorithm based on Bayes' theorem and the assumption of feature independence.  While the independence assumption is often violated in practice, Naive Bayes can still perform surprisingly well in some cases.  It is particularly useful for high-dimensional datasets.

**Decision Trees:**  A tree-based model that recursively partitions the feature space into homogeneous regions based on feature splits.  Decision trees are easy to interpret and can capture non-linear relationships between features and the outcome variable. However, individual decision trees are prone to overfitting.

**Support Vector Machines (SVM):**  A powerful classification algorithm that finds a hyperplane that maximizes the margin between classes.  SVMs can capture non-linear relationships using kernel functions, which map the data to a higher-dimensional space.

**Hyperparameter Tuning:**  Most machine learning algorithms have hyperparameters that control their complexity and learning behavior. Tuning these hyperparameters is crucial for achieving optimal model performance.  Common hyperparameter tuning techniques include:

* **Grid Search:** Systematically evaluating the model's performance for different combinations of hyperparameter values.
* **Random Search:** Randomly sampling hyperparameter values from a specified distribution.
* **Bayesian Optimization:**  Using a Bayesian approach to optimize hyperparameter values.


### 14. Neural Networks and Deep Learning (Continued)

This chapter explores neural networks, a powerful class of machine learning models inspired by the structure and function of the human brain.

**Multi-layer Perceptron (MLP):** The most common type of neural network, consisting of an input layer, one or more hidden layers, and an output layer.  Each layer is composed of interconnected nodes (neurons) that process and transform the data.


**Activation Functions:** Non-linear functions that introduce non-linearity into the model.  Common activation functions include:

* **Sigmoid:**  Maps values to the range [0, 1].
* **ReLU (Rectified Linear Unit):**  Returns the maximum of 0 and the input value.
* **Tanh (Hyperbolic Tangent):**  Maps values to the range [-1, 1].


**Backpropagation:** An algorithm for training neural networks by iteratively adjusting the weights of the connections between neurons to minimize the loss function.


**Deep Learning:**  Neural networks with multiple hidden layers. Deep learning models can learn complex non-linear relationships in the data.


### 15. Ensemble Techniques (Continued)

**Bagging (Bootstrap Aggregating):**  Training multiple models on different bootstrapped samples of the training data and aggregating their predictions. Bagging reduces variance and improves model stability.

**Boosting:**  Sequentially training models, giving more weight to misclassified observations in subsequent iterations. Boosting reduces bias and improves model accuracy.

**Random Forests:**  An ensemble of decision trees trained using bagging and random feature selection. Random forests are robust and accurate and can handle high-dimensional datasets.

**Boosted Trees:**  An ensemble of decision trees trained using boosting.  Popular boosted tree algorithms include:

* **AdaBoost (Adaptive Boosting):**
* **Gradient Boosting:**
* **XGBoost (Extreme Gradient Boosting):**
* **LightGBM (Light Gradient Boosting Machine):**


**Voting Classifier/Regressor:**  Combining predictions from multiple different models using majority voting (for classification) or averaging (for regression).


### 16. Machine Learning for LGD (Continued)

Applying machine learning techniques to LGD modeling, using regression methods instead of classification methods.  Commonly used techniques include linear regression, regularized regression (Ridge, LASSO), KNN, decision trees, random forests, boosted trees, support vector regression (SVR), and neural networks.


## Part V: Synthesis: Lifetime Modeling, IFRS 9/CECL, Loan Pricing, and Credit Portfolio Risk (Continued)

### 17. Multi-period Modeling (Continued)

This chapter focuses on extending the models discussed earlier to a multi-period setting, which is essential for lifetime loss provisioning and loan pricing.

**Term Structures:**  Modeling risk measures (PD, LGD, EAD) as functions of time, vintage, and age.

**Roll Rate Analysis:** Analyzing rating migration patterns over time, often represented by transition matrices.

**Survival Time Models:**  Modeling the time to default using survival analysis techniques. These models are particularly useful for capturing the time dimension of credit risk.

* **Cox Proportional Hazard (CPH) Model:** A popular survival model that assumes a proportional hazard rate.  The hazard rate is the instantaneous probability of default at a given time, conditional on surviving up to that time. The CPH model expresses the hazard rate as a product of a baseline hazard function and a function of covariates.

```
h(t|x) = h0(t) * exp(β'x)
```

where:

* h(t|x) is the hazard rate at time t for an individual with covariate vector x.
* h0(t) is the baseline hazard function.
* β is the vector of coefficients.

**Survival Function:** The probability of surviving beyond time t.

**Hazard Function:** The instantaneous rate of default at time t, given survival up to time t.

### 18. Expected Credit Losses (Continued)

**Expected Loss (EL):** The expected value of the loss on a loan or portfolio over a given period or lifetime.

**1-Year EL:**  The expected loss over a one-year horizon.

**Lifetime EL (LEL):** The expected loss over the lifetime of the loan. LEL is calculated by summing the discounted expected losses for each future period, considering the probabilities of default, payoff, and survival.

**IFRS 9/CECL:** International Financial Reporting Standard 9 (IFRS 9) and the Current Expected Credit Loss (CECL) standard in the US require banks to provision for lifetime expected losses on financial instruments. This represents a significant change from the previous incurred loss model.

**Stages of Credit Losses (IFRS 9):**

* **Stage 1:** Performing loans with no significant increase in credit risk. Provision for 12-month EL.
* **Stage 2:** Performing loans with a significant increase in credit risk. Provision for lifetime EL.
* **Stage 3:**  Impaired loans. Provision for lifetime EL.

**Significant Increase in Credit Risk (SICR):** A significant increase in credit risk is defined as a substantial deterioration in the credit quality of a loan since initial recognition.  Various methods can be used to assess SICR, including comparing the current PD with the PD at origination or evaluating changes in credit ratings.

**Loan Pricing:** Incorporating expected and unexpected losses into loan pricing models to ensure that the loan price adequately compensates the lender for the risk of default.

### 19. Unexpected Credit Losses (Continued)

This chapter focuses on modeling unexpected credit losses, which are losses that exceed the expected loss.

**Value-at-Risk (VaR):**  A statistical measure of risk that represents the maximum potential loss on a portfolio over a given time horizon at a specified confidence level.  For example, a 99.9% one-year VaR represents the loss that is expected to be exceeded only 0.1% of the time over a one-year horizon.

**Conditional Value-at-Risk (CVaR) / Expected Shortfall (ES):** A coherent risk measure that represents the expected loss conditional on exceeding VaR. CVaR provides a more comprehensive measure of tail risk compared to VaR.

**Asset Correlation (ρ):**  A measure of the dependence between defaults in a portfolio. Asset correlation is a crucial parameter in credit portfolio models, as it affects the diversification benefit of holding a portfolio of loans.

**Credit Portfolio Loss Distributions:**  Modeling the distribution of losses in a credit portfolio. Various methods can be used to model portfolio loss distributions, including:

* **Analytical Methods (e.g., ASRF Model):** Suitable for large, homogeneous portfolios.
* **Numerical Integration:** Can handle limited granularity.
* **Monte Carlo Simulation:**  A flexible approach that can handle heterogeneous portfolios and complex dependencies.

### 20. Outlook (Continued)

This chapter discusses the current trends and future directions in credit risk analytics, including the increasing use of machine learning, big data, and alternative data sources.  It also highlights the challenges and opportunities presented by new regulations, such as IFRS 9 and CECL.  The chapter emphasizes the importance of staying up-to-date with the latest developments in the field and adapting to the changing landscape of credit risk management.