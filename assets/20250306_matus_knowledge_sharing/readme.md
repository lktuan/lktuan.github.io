# I read the scorecard development code of someone I've been working with, named Matus

## Notebooks, cell outputs, and charts style

```bash
# choosing themes using `jt`
!jt -t chesterish -T -N -kl -f roboto -fs 10 -cellw 80%
```

```python
# matplotlib preferences
plt.style.use('classic')
# pandas preferences
pd.set_option('display.max_columns', 300)
pd.set_option('display.max_rows', 1000)
```

## Data Manipulation

A summary table with the pattern `df.groupby(...).agg(...)`:

```python
df_dev.groupby("STATUS_MONTH").agg(
    cnt = ('APPLICATION_NUMBER', 'count'),
    cnt_distinct = ('APPLICATION_NUMBER', lambda x: x.nunique()),
    cnt_pcb_hit = ('PCB_HIT', 'sum'),
    cnt_ntb = ('CLIENT_TYPE', lambda x: (x == 'NTB').sum()),
    cnt_ntb_pct = ('CLIENT_TYPE', lambda x: (x == 'NTB').sum() / len(x)),
    cnt_xtb = ('CLIENT_TYPE', lambda x: (x == 'XTB').sum()),
    cnt_xtb_pct = ('CLIENT_TYPE', lambda x: (x == 'XTB').sum() / len(x)),    
    cnt_cl_null = ('CLIENT_TYPE', lambda x: x.isnull().sum()),
    cnt_express_card = ('CARD_TYPE_GROUP_NAME', lambda x: (x == 'EXPRESSCARD').sum()),
    cnt_salary_card = ('CARD_TYPE_GROUP_NAME', lambda x: (x != 'EXPRESSCARD').sum())
)
```

A pivot table pattern:

```python
pd.pivot_table(
    df_dev,
    index='STATUS_MONTH', # rows of the pivot table
    columns='DATA_TYPE', # columns of the pivot table
    values=['APPLICATION_NUMBER', 'DEV_FLAG_TTD', 'DEV_FLAG'],
    aggfunc={'APPLICATION_NUMBER':'count', 'DEV_FLAG_TTD':'sum', 'DEV_FLAG':'sum'},
    margins=True
)
```

Get a division value show after pivoting:

```python
pvt_tb_psi = pd.pivot_table(
    df_train,
    index = time_col,
    columns = pred_woe,
    values = id_col,
    aggfunc = 'count')
pvt_tb_psi = pvt_tb_psi.div(pvt_tb_psi.sum(axis='columns'), axis='rows')
```

## Plot

Using `plt.subplots()` even when plotting a single graph is a common and recommended practice in Matplotlib:

```python
import matplotlib.pyplot as plt

fig,ax = plt.subplots(figsize=(20,10))
xgb.plot_importance(xgb_clf, ax=ax, max_num_features = 30)
plt.show()
```

Correlation heatmap:

```python
def correlation_heatmap(train):
    import seaborn as sns
    correlations = train.corr()

    fig, ax = plt.subplots(figsize=(40,40))
    sns.heatmap(correlations, vmax=1.0, center=0, fmt='.2f', cmap="YlGnBu",
                square=True, linewidths=.5, annot=True, cbar_kws={"shrink": .70}
                )
    plt.show()
```

## Metrics

PSI: <https://riskmodel.net/smcs/monitoring-stability/>.

```python
def psi(expected_perc, actual_perc):
    def sub_psi(e_perc, a_perc):
        '''Calculate the actual PSI value from comparing the values.
           Update the actual value to a very small number if equal to zero
        '''
        if a_perc == 0:
            a_perc = 0.0001
        if e_perc == 0:
            e_perc = 0.0001

        value = (e_perc - a_perc) * np.log(e_perc / a_perc)
        return(value)
    
    frame = { 'expected': expected_perc, 'actual': actual_perc }
    df = pd.DataFrame(frame)
    frame['psi'] = df.apply(lambda x: sub_psi(x.expected, x.actual), axis=1)
    psi_value = frame['psi'].sum()

    return(psi_value)
```

GINI: <https://riskmodel.net/base/discrimination/>.

```python
def gini_calc(true_labels, predicted_prob, obs_flag):
    from sklearn.metrics import roc_auc_score
    
    frame = {'true': true_labels, 'pred': predicted_prob, 'obs': obs_flag}
    df = pd.DataFrame(frame)
    df = df[df['obs'] == 1]
    
    if (len(df) > 0) and (df['true'].nunique() > 1):
        return 1 - 2*roc_auc_score(df['true'], df['pred'])
    else:
        return float('nan')
```

KS: <https://riskmodel.net/base/discrimination/>.

```python
def ks_calc(true_labels, predicted_prob, obs_flag):
    from scipy.stats import ks_2samp

    frame = {'true':true_labels, 'pred':predicted_prob, 'obs':obs_flag}
    df = pd.DataFrame(frame)
    df = df[df['obs'] == 1]

    if (len(df) > 0) and (df['true'].nunique() > 1):
        return ks_2samp(df.loc[df['true']==0, 'pred'], df.loc[df['true']==1, 'pred']).statistic * 100
    else:
        return float('nan')
```

Stability summary table:

```python
def stability_summary_table(df_test, df_train, time_col, id_col, pred, pred_woe, targets):
    def mr(x):
        return x.isnull().sum() / len(x)

    def mean_cust(x):
        try:
            return x.mean()
        except:
            return float('nan')
        
    pvt_tb_basic = df_test.groupby(time_col).agg(
        count = (pred, 'size'),
        mean = (pred, mean_cust),
        mr = (pred, mr)
    )
    
    pvt_tb_expected = pd.pivot_table(df_train, columns = pred_woe, values = id_col, aggfunc = 'count')
    cols = pvt_tb_expected.columns
    pvt_tb_expected = pvt_tb_expected.div(pvt_tb_expected.sum(axis='columns'), axis='rows').values[0]

    pvt_tb_psi = pd.pivot_table(df_test, index = time_col, columns = pred_woe, values = id_col, aggfunc = 'count')
    pvt_tb_psi = pd.concat([pd.DataFrame(columns=cols), pvt_tb_psi]).fillna(0)
    pvt_tb_psi = pvt_tb_psi.div(pvt_tb_psi.sum(axis='columns'), axis='rows')
    pvt_tb_psi['PSI'] = pvt_tb_psi.apply(lambda x: psi(pvt_tb_expected, x), axis=1)
    
    result = pvt_tb_basic.join(pvt_tb_psi, how='left')
    
    for target in targets:
        pvt_tb_gini = df_test.groupby(time_col).agg(
            target_obs_sum = (target[1], 'sum'),
            target_sum = (target[0], 'sum')
        )
        pvt_tb_gini.columns = [target[1]+'_sum', target[0]+'_sum']
        
        pvt_tb_gini[target[0]+'_gini'] = df_test.groupby(time_col).apply(lambda x: gini_calc(x[target[0]], x[pred_woe], x[target[1]]))
        gini_total = gini_calc(df_test[target[0]], df_test[pred_woe], df_test[target[1]])
        if gini_total < 0:
            pvt_tb_gini[target[0]+'_gini'] = - pvt_tb_gini[target[0]+'_gini']
            
        result = result.join(pvt_tb_gini, how='left')

    return result
```

And visualize it:

```python
def stability_summary_table_visualize(stab_summary_tbl):
    import matplotlib.pyplot as plt
    
    ind = range(len(stab_summary_tbl.index.tolist()))
    
    #define subplots
    plt.style.use('classic')
    fig,ax = plt.subplots(nrows=1, ncols=3, figsize=(30,6))

    ax[0].plot(ind, stab_summary_tbl['mean'], color='steelblue', marker='o', linewidth=2)
    ax[0].set_xticks(ind)
    ax[0].set_xticklabels(stab_summary_tbl.index.tolist(), rotation = 45)
    ax[0].set_xlabel('Month', fontsize=14)
    ax[0].set_ylabel('Mean', color='steelblue', fontsize=16)

    ax0_twinx = ax[0].twinx()
    ax0_twinx.plot(ind, stab_summary_tbl['mr'], color='red', marker='o', linewidth=2)
    ax0_twinx.set_ylabel('MR', color='red', fontsize=16)
    ax0_twinx.set_ylim([0,1])
    
    ax[1].plot(ind, stab_summary_tbl['PSI'], color='black', marker='o', linewidth=2)
    ax[1].set_xticks(ind)
    ax[1].set_xticklabels(stab_summary_tbl.index.tolist(), rotation = 45)
    ax[1].set_xlabel('Month', fontsize=14)
    ax[1].set_ylabel('PSI', color='black', fontsize=16)
    ax[1].set_ylim([0,0.5])
    ax[1].axhline(y = 0.1, color = 'darkorange', linestyle = 'dashed')
    ax[1].axhline(y = 0.25, color = 'r', linestyle = 'dashed')
    
    blues = ['navy', 'mediumblue', 'royalblue', 'lightblue']    
    gini_cols = [col for col in stab_summary_tbl.columns if str(col).endswith('gini')]
    for col in enumerate(gini_cols):
        clr = blues[col[0]%len(blues)]
        ax[2].plot(ind, stab_summary_tbl[col[1]], color=clr, marker='o', linewidth=2, label=col[1])
    
    ax[2].set_xticks(ind)
    ax[2].set_xticklabels(stab_summary_tbl.index.tolist(), rotation = 45)
    ax[2].set_xlabel('Month', fontsize=14)
    ax[2].set_ylabel('Gini', color='black', fontsize=16)
    ax[2].set_ylim([-0.5,0.5])
    ax[2].axhline(y = 0, color = 'r')
    ax[2].legend(loc='best')
    
    plt.show()
```

## Misc

- What is soc-dem data: ""Soc-dem" is an abbreviation for "socio-demographic" data."
